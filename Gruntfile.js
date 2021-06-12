var S = require("string");
var fm = require('front-matter');
var MarkdownIt = require("markdown-it");

const headingTags = new Set(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']);
const ignoredTokens = new Set(['heading_open', 'heading_close']);

var CONTENT_PATH_PREFIX = "./content";

module.exports = function(grunt) {

    grunt.registerTask("lunr-index", function() {

        grunt.log.writeln("Build pages index");

        var indexPages = function() {
            var pagesIndex = [];
            grunt.file.recurse(CONTENT_PATH_PREFIX, function(abspath, rootdir, subdir, filename) {
                grunt.verbose.writeln("Parse file:",abspath);
                pagesIndex = pagesIndex.concat(processFile(abspath, filename));
            });

            return pagesIndex;
        };

        var processFile = function(abspath, filename) {
            var pageIndex;

            if (S(filename).endsWith(".html")) {
                pageIndex = processHTMLFile(abspath, filename);
            } else {
                grunt.verbose.writeln(abspath);
                pageIndex = processMDFile(abspath, filename);
            }

            return pageIndex;
        };

        var processHTMLFile = function(abspath, filename) {
            grunt.verbose.writeln("HTML file: ", filename);
            var content = grunt.file.read(abspath);
            var pageName = S(filename).chompRight(".html").s;
            var href = S(abspath)
                .chompLeft(CONTENT_PATH_PREFIX).s;
            return {
                title: pageName,
                href: href,
                content: S(content).trim().stripTags().stripPunctuation().s
            };
        };

        Array.prototype.remove = function() {
            var what, a = arguments, L = a.length, ax;
            while (L && this.length) {
                what = a[--L];
                while ((ax = this.indexOf(what)) !== -1) {
                    this.splice(ax, 1);
                }
            }
            return this;
        };

        var processMDFile = function(abspath, filename) {
            var content = grunt.file.read(abspath);
            var pageIndex;

            var file = fm(content);
            // grunt.verbose.writeln(file.body);

            var markdown = file.body;

              const markdownIt = new MarkdownIt();
              const tokens = markdownIt.parse(markdown, {});

              const headings = [];
              let headingToken = null;

              for (const token of tokens) {
                if (headingTags.has(token.tag)) {
                  if (token.type === 'heading_open') {
                    headingToken = token.markup;
                  } else if (token.type === 'heading_close') {
                    headingToken = null;
                  }
                }

                if (ignoredTokens.has(token.type)) {
                  continue;
                }

                if (headingToken === null) {
                  continue;
                }

                headings.push(`${token.children.map(t => t.content).join('')}`);
              }

            var href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(".md").s;
            if (filename === "index.md") {
                href = S(abspath).chompLeft(CONTENT_PATH_PREFIX).chompRight(filename).s;
            }

            var slug;
            if (file.attributes.slug) {
                slug = file.attributes.slug;
            } else {
                slug = S(file.attributes.title).slugify().s
            }

            if (slug.startsWith("/")) {
                slug = slug.slice(1, slug.length - 1);
            }

            var folder,
                splitPath = S(abspath).split("/");
            if (splitPath.length == 3) {
                folder = splitPath[1] + "/";
            } else {
                folder = "";
            }

            out = [];
            headings.forEach(function(heading) {
                out.push(pageIndex = {
                    title: file.attributes.title,
                    href: folder + slug + "#" + S(heading).slugify().s,
                    content: heading
                });
            });

            return out;
        };

        grunt.file.write("static/js/lunr/PagesIndex.json", JSON.stringify(indexPages()));
        grunt.log.ok("Index built");
    });
};