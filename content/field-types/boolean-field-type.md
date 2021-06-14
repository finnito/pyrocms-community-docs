---
title: Boolean Field Type
---

## Introduction

`anomaly.field_type.boolean`

The boolean field type provides a simple on/off input.

### Configuration

Below is the full configuration available with defaults values:

```php
"example" => [
    "type"   => "anomaly.field_type.boolean",
    "config" => [
        "default_value" => false,
        "on_color"      => "success",
        "off_color"     => "danger",
        "on_text"       => "YES",
        "off_text"      => "NO",
        "mode"          => "checkbox",
        "label"         => null,
    ]
]
```

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Example</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> default_value </td>
            <td> true </td>
            <td> The default value. </td>
        </tr>
        <tr>
            <td> on_color </td>
            <td> default </td>
            <td> The color of the "on" state. Valid options are `success`, `info`, `warning`, `danger`, and `default`. </td>
        </tr>
        <tr>
            <td> off_color </td>
            <td> warning </td>
            <td> The color of the "off" state. Valid options are `success`, `info`, `warning`, `danger`, and `default`. </td>
        </tr>
        <tr>
            <td> on_text </td>
            <td> Yeppers </td>
            <td> The text for the "on" state. </td>
        </tr>
        <tr>
            <td> off_text </td>
            <td> No way! </td>
            <td> The text for the "off" state. </td>
        </tr>
        <tr>
            <td> mode </td>
            <td> checkbox </td>
            <td> The input mode. Valid options are `radio`, `switch`, or `checkbox`. </td>
        </tr>
        <tr>
            <td> label </td>
            <td> Yes, I agree to these terms. </td>
            <td> For `checkbox` mode only. The checkbox label. </td>
        </tr>
    </tbody>
</table>

## Usage

This section will show you how to use the field type via API and in the view layer.

### Setting Values

You can set the boolean field type value with a boolean value:

```php
$entry->example = true
```

You can also set the value with a boolean-filterable string.

```php
$entry->example = "yes"; // Value is "true"
```

### Basic Output

The `value` returned by the field type will always be a `boolean` value.

```php
$entry->example; // true or false
```

### Presenter Output

This section will show you how to use the decorated value provided by the `\Anomaly\BooleanFieldType\BooleanFieldTypePresenter` class.

#### BooleanFieldTypePresenter::isTrue()

The `isTrue` method returns whether the `value` is `true` or not. This is a shortcut for the `is(true)` method.

> Returns: `boolean`

##### Example

```php
// PHP
$decorated->example->isTrue();

// Twig
{% if decorated.example.isTrue() %}
  Yep!
{% endif %}

// Presenter processing means you can simply do this:
// PHP
if ($decorated->examaple->true) {
    // Do your thing
}

// Twig
{% if decorated.example.true %}
  Yep!
{% endif %}
```

#### BooleanFieldTypePresenter::isFalse()

The `isFalse` method returns whether the value is `false` or not. If the value is `false` this method will return `true`. This is a shortcut for the `is(false)` method.

> Returns: `boolean`

```php
$decorated->example->isTrue(); // bool
```

##### Example

```twig
{% if decorated.example.isFalse() %}
  Oh crap...
{% endif %}

// Presenter processing means you can simply do this:
{% if decorated.example.false %}
  Yep!
{% endif %}
```

#### BooleanFieldTypePresenter::is()

The `is` method returns whether the value matches the test value.

> Returns: `boolean`

##### Arguments

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Key</th>
            <th>Required</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                $test
            </td>
            <td>
                true
            </td>
            <td>
                mixed
            </td>
            <td>
                none
            </td>
            <td>
                The boolean or filterable text to test.
            </td>
        </tr>
    </tbody>
</table>

##### Example

```php
// PHP
if ($decorated->example->is(true)) {
    echo "Yes!";
}

// Twig
{% if decorated.example.is(true) %}
  Yep!
{% endif %}
```

#### BooleanFieldTypePresenter::icon()

The `icon` method returns an icon representing the value.

> Returns: `string`

##### Arguments

<table>
    <thead>
        <tr>
            <th>Key</th>
            <th>Required</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                $size
            </td>
            <td>
                false
            </td>
            <td>
                string
            </td>
            <td>
                sm
            </td>
            <td>
                The size of the icon. Valid options are `sm`, `md`, and `lg`.
            </td>
        </tr>
    </tbody>
</table>



##### Example

```php
// PHP
$decorated->example->icon('lg'); // <i class="text-{color} fa fa-check fa-lg"></i>

// Twig
{{ decorated.example.icon(); // <i class="text-{color} fa fa-check fa-sm"></i>
```

#### BooleanFieldTypePresenter::color()

The `color` method returns the configured state color based on the value.

> Returns: `string`

##### Example

```php
// PHP
$decorated->example->color();

// Twig
{{ decorated.example.color() }}
```

#### BooleanFieldTypePresenter::label()

The `label` method returns a label of the configured state color based on the value.

> Returns: `string`

##### Example

```php
// PHP
$decorated->example->label();

// Twig
{{ decorated.example.label() }}
```

#### BooleanFieldTypePresenter::text()

The `text` method returns text based on the value.

> Returns: `string`

##### Arguments

<table class="table table-bordered table-striped">
    <thead>
        <tr>
            <th>Key</th>
            <th>Required</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td> $on </td>
            <td> false </td>
            <td> string </td>
            <td> The configured `on_text`. </td>
            <td> Text for "on" state. </td>
        </tr>
        <tr>
            <td> $ff </td>
            <td> false </td>
            <td> string </td>
            <td> The configured `off_text`. </td>
            <td> Text for "off" state. </td>
        </tr>
    </tbody>
</table>

##### Example

```php
// PHP
$decorated->example->text('YAS!', 'DRAT!');

// Twig
{{ decorated.example.text('YAS!', 'DRAT!') }}
```

#### BooleanFieldTypePresenter::toggle()

The `toggle` method returns an `ajax` input switch that will update the value.

> Returns: `string`

##### Example

```php
// PHP
$decorated->example->toggle();

// Twig
Status: {{ decorated.example.toggle()|raw }}
```

This method is great for use in table columns when constructing table builders!

```php
protected $columns = [
    'entry.example.toggle' => [
        'is_safe' => true,
    ],
];
```
