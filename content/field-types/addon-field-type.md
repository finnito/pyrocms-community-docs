---
title: Addon Field Type
---

## Introduction

`anomaly.field_type.addon`

The addon field type provides a configurable select dropdown of addons. The field type acts very similar to a relationship between an addon and an entry.

### Installation

```bash
composer require anomaly/addon-field_type
```

### Configuration

Below is a list of available configuration with default values.

```php
"example" => [
    "type"   => "anomaly.field_type.addon",
    "config" => [
        "default_value" => null,
        "type"          => null,
        "search"        => null,
        "theme_type"    => null,
        "handler"       => "Anomaly\AddonFieldType\Handler\DefaultHandler@handle"
    ]
]
```

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Key</th>
            <th>Example</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>default_value</td>
            <td>anomaly.module.files</td>
            <td>The default value.</td>
        </tr>
        <tr>
            <td>type</td>
            <td>module</td>
            <td>If defined only addons of the specified type will be displayed. Valid options are <code>module</code>, <code>field_type</code>, <code>plugin</code>, <code>module</code>, and <code>extension</code>.</td>
        </tr>
        <tr>
            <td>search</td>
            <td>anomaly.module.users::authentication.*</td>
            <td>The extension search option will search and return only extensions with a provision string that matches your search.</td>
        </tr>
        <tr>
            <td>theme_type</td>
            <td>admin</td>
            <td>Restrict what type of themes are returned. Valid options are <code>admin</code> or <code>standard</code>.</td>
        </tr>
        <tr>
            <td>handler</td>
            <td><code>Example/Test/MyOptions@handle</code></td>
            <td>Handlers let you override control of the options logic.</td>
        </tr>
    </tbody>
</table>

### Option Handlers

Option handlers are responsible for setting the available options on the field type. You can define your own option handler to add your own logic to available dropdown options.

You can define custom handlers as a callable string where `@handle` will be assumed if no method is provided:

```php
// Assumes @handle
"handler" => /Example/Test/CustomOptions::class 

// Option handlers can also a handler with a closure:
"handler" => function (AddonFieldType $fieldType, ExampleModule $module) {
    $fieldType->setOptions(
        [
            "anomaly.module.example" => $module->getName()
        ]
    );
}
```

<div class="alert alert-info"><strong>Remember:</strong> Closures can not be stored in the database so your closure type handlers must be set / overridden from the form builder.</div>

#### Writing Option Handlers

Writing custom option handlers is easy. To begin create a class with the method you defined in the config option.

```php
"handler" => "App/Example/MyOptions@handle"
```

The callable string is called via Laravel's service container. The `AddonFieldType $fieldType` is passed as an argument.

<div class="alert alert-primary"><strong>Pro Tip:</strong> Handlers are called through Laravel's service container so method and class injection is supported.</div>

```php
<?php namespace App/Example;

class MyOptions
{
    public function handle(AddonFieldType $fieldType)
    {
        $fieldType->setOptions(
            [
                "anomaly.module.example" => 'Example'
            ]
        );
    }
}
```

## Usage

This section will show you how to use the field type via API and in the view layer.

### Setting Values

You can set the addon field type value with an addon's namespace:

```php
$entry->example = "anomaly.module.files"
```

You can also set the value with an instance of an addon:

```php
$entry->example = $module;
```

Lastly you can set the value with an instance of an addon presenter:

```php
$entry->example = $decorated;
```

### Basic Output

The `value` returned by the field type is either `null` or an instance of the selected addon.

```php
$entry->example->getNamespace(); // anomaly.module.files
```

### Presenter Output

The addon field type will always return `null` or an instance of the addon. When accessing the field value from a decorated entry model the returned addon instance will be automatically decorated.

```php
$decorated->example->name; // PHP
{{ decorated.example.name }} // Twig
```
