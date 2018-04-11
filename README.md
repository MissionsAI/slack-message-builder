[![Sponsored by Beep Boop](https://img.shields.io/badge/%E2%9D%A4%EF%B8%8F_sponsored_by-%E2%9C%A8_Robots%20%26%20Pencils_%E2%9C%A8-FB6CBE.svg)](https://missions.ai)
[![Build Status](https://travis-ci.org/missionsai/slack-message-builder.svg)](https://travis-ci.org/MissionsAI/slack-message-builder)
[![Coverage Status](https://coveralls.io/repos/github/MissionsAI/slack-message-builder/badge.svg)](https://coveralls.io/github/missionsai/slack-message-builder)

# Slack Message Builder
Slack Message Builder is a node.js module that builds JSON documents that can be used to post messages to slack's chat.postMessage API. Can be used where ever you need to generate Slack message JSON especially in [Slapp](https://github.com/missionsai/slapp).

## Install

```
npm install --save slack-message-builder
```

## Usage
### Basic Formatting
```javascript
const smb = require('slack-message-builder')
smb().text('I am a test message http://slack.com')
  .attachment()
    .text("And here's an attachment!")
  .end()
.json()
```
[Produces](https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22I%20am%20a%20test%20message%20http%3A%2F%2Fslack.com%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22And%20here%27s%20an%20attachment!%22%7D%5D%7D)
```javascript
{
    "text": "I am a test message http://slack.com",
    "attachments": [
        {
            "text": "And here's an attachment!"
        }
    ]
}
```

### Attachments
```javascript
const smb = require('slack-message-builder')
smb()
  .attachment()
    .fallback("Required plain-text summary of the attachment.")
    .color("#36a64f")
    .pretext("Optional text that appears above the attachment block")
    .authorName("Bobby Tables")
    .authorLink("http://flickr.com/bobby/")
    .authorIcon("http://flickr.com/icons/bobby.jpg")
    .title("Slack API Documentation")
    .titleLink("https://api.slack.com/")
    .text("Optional text that appears within the attachment")
    .field()
      .title("Priority")
      .value("High")
      .short(false)
    .end()
    .imageUrl("http://my-website.com/path/to/image.jpg")
    .thumbUrl("http://example.com/path/to/thumb.png")
    .footer("Slack API")
    .footerIcon("https://platform.slack-edge.com/img/default_application_icon.png")
    .ts(12345678)
  .end()
.json()
```
[Produces](https://api.slack.com/docs/messages/builder?msg=%7B%22attachments%22%3A%5B%7B%22fallback%22%3A%22Required%20plain-text%20summary%20of%20the%20attachment.%22%2C%22color%22%3A%22%2336a64f%22%2C%22pretext%22%3A%22Optional%20text%20that%20appears%20above%20the%20attachment%20block%22%2C%22author_name%22%3A%22Bobby%20Tables%22%2C%22author_link%22%3A%22http%3A%2F%2Fflickr.com%2Fbobby%2F%22%2C%22author_icon%22%3A%22http%3A%2F%2Fflickr.com%2Ficons%2Fbobby.jpg%22%2C%22title%22%3A%22Slack%20API%20Documentation%22%2C%22title_link%22%3A%22https%3A%2F%2Fapi.slack.com%2F%22%2C%22text%22%3A%22Optional%20text%20that%20appears%20within%20the%20attachment%22%2C%22fields%22%3A%5B%7B%22title%22%3A%22Priority%22%2C%22value%22%3A%22High%22%2C%22short%22%3Afalse%7D%5D%2C%22image_url%22%3A%22http%3A%2F%2Fmy-website.com%2Fpath%2Fto%2Fimage.jpg%22%2C%22thumb_url%22%3A%22http%3A%2F%2Fexample.com%2Fpath%2Fto%2Fthumb.png%22%2C%22footer%22%3A%22Slack%20API%22%2C%22footer_icon%22%3A%22https%3A%2F%2Fplatform.slack-edge.com%2Fimg%2Fdefault_application_icon.png%22%2C%22ts%22%3A123456789%7D%5D%7D)
```javascript
{
    "attachments": [
        {
            "fallback": "Required plain-text summary of the attachment.",
            "color": "#36a64f",
            "pretext": "Optional text that appears above the attachment block",
            "author_name": "Bobby Tables",
            "author_link": "http://flickr.com/bobby/",
            "author_icon": "http://flickr.com/icons/bobby.jpg",
            "title": "Slack API Documentation",
            "title_link": "https://api.slack.com/",
            "text": "Optional text that appears within the attachment",
            "fields": [
                {
                    "title": "Priority",
                    "value": "High",
                    "short": false
                }
            ],
            "image_url": "http://my-website.com/path/to/image.jpg",
            "thumb_url": "http://example.com/path/to/thumb.png",
            "footer": "Slack API",
            "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
            "ts": 123456789
        }
    ]
}
```

### Buttons
```javascript
const smb = require('slack-message-builder')
smb()
  .text("Would you like to play a game?")
  .attachment()
    .text("Choose a game to play")
    .fallback("You are unable to choose a game")
    .callbackId("wopr_game")
    .color("#3AA3E3")
    .button()
      .name("chess")
      .text("Chess")
      .type("button")
      .value("chess")
    .end()
    .button()
      .name("maze")
      .text("Falken's Maze")
      .type("button")
      .value("maze")
    .end()
    .button()
      .name("war")
      .text("Thermonuclear War")
      .style("danger")
      .type("button")
      .value("war")
        .confirm()
          .title("Are you sure?")
          .text("Wouldn't you prefer a good game of chess?")
          .okText("Yes")
          .dismissText("No")
        .end()
    .end()
  .end()
.json()
```
[Produces](https://api.slack.com/docs/messages/builder?msg=%7B%22text%22%3A%22Would%20you%20like%20to%20play%20a%20game%3F%22%2C%22attachments%22%3A%5B%7B%22text%22%3A%22Choose%20a%20game%20to%20play%22%2C%22fallback%22%3A%22You%20are%20unable%20to%20choose%20a%20game%22%2C%22callback_id%22%3A%22wopr_game%22%2C%22color%22%3A%22%233AA3E3%22%2C%22attachment_type%22%3A%22default%22%2C%22actions%22%3A%5B%7B%22name%22%3A%22chess%22%2C%22text%22%3A%22Chess%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22chess%22%7D%2C%7B%22name%22%3A%22maze%22%2C%22text%22%3A%22Falken%27s%20Maze%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22maze%22%7D%2C%7B%22name%22%3A%22war%22%2C%22text%22%3A%22Thermonuclear%20War%22%2C%22style%22%3A%22danger%22%2C%22type%22%3A%22button%22%2C%22value%22%3A%22war%22%2C%22confirm%22%3A%7B%22title%22%3A%22Are%20you%20sure%3F%22%2C%22text%22%3A%22Wouldn%27t%20you%20prefer%20a%20good%20game%20of%20chess%3F%22%2C%22ok_text%22%3A%22Yes%22%2C%22dismiss_text%22%3A%22No%22%7D%7D%5D%7D%5D%7D)
```javascript
{
    "text": "Would you like to play a game?",
    "attachments": [
        {
            "text": "Choose a game to play",
            "fallback": "You are unable to choose a game",
            "callback_id": "wopr_game",
            "color": "#3AA3E3",
            "actions": [
                {
                    "name": "chess",
                    "text": "Chess",
                    "type": "button",
                    "value": "chess"
                },
                {
                    "name": "maze",
                    "text": "Falken's Maze",
                    "type": "button",
                    "value": "maze"
                },
                {
                    "name": "war",
                    "text": "Thermonuclear War",
                    "style": "danger",
                    "type": "button",
                    "value": "war",
                    "confirm": {
                        "title": "Are you sure?",
                        "text": "Wouldn't you prefer a good game of chess?",
                        "ok_text": "Yes",
                        "dismiss_text": "No"
                    }
                }
            ]
        }
    ]
}
```

### Message Menus (type=select)

Message menus:

```javascript
const smb = require('slack-message-builder')
smb()
  .text("Pick a user")
  .attachment()
    .text("")
    .fallback("Pick a user")
    .callbackId("user_callback")
    .select()
      .name("pick_user")
      .text("Users")
      .dataSource("users")
    .end()
    .select()
      .name("pick_channel")
      .text("Channels")
      .dataSource("channels")
    .end()
    .select()
      .name("pick_value")
      .text("Static")
      .option("some text", "a value")
      .option("some more text", "moar value")
      .option("an object value", { foo: 'bar' })
      .option("even more text", "even moar value", "a description", isSelected) // isSelected = true
    .end()
    .select()
      .name("pick_dynamic")
      .text("Choose something dynamic!")
      .dataSource("external")
    .end()
  .end()
.json()
```

Produces:

```javascript
{
    text: 'Pickauser',
    attachments: [
        {
            text: '',
            fallback: 'Pickauser',
            callback_id: 'user_callback',
            actions: [
                {
                    type: 'select',
                    name: 'pick_user',
                    text: 'Users',
                    data_source: 'users'
                },
                {
                    type: 'select',
                    name: 'pick_channel',
                    text: 'Channels',
                    data_source: 'channels'
                },
                {
                    type: 'select',
                    name: 'pick_value',
                    text: 'Static',
                    options: [
                        {
                            text: 'some text',
                            value: ' avalue'
                        },
                        {
                            text: 'some more text',
                            value: 'moar value'
                        },
                        {
                            text: 'an object value',
                            value: '{"foo":"bar"}'
                        },
                        {
                            text: 'even more text',
                            value: 'even moar value',
                            description: "a description",
                            selected: true
                        }
                    ]
                },
                {
                    type: 'select',
                    name: 'pick_dynamic',
                    text: 'Choosesomethingdynamic!',
                    data_source: 'external'
                }
            ]
        }
    ]
}
```

### Message Menus with Option Groups (type=select)
```javascript
const smb = require('slack-message-builder')
smb()
  .text('Pick a user')
  .attachment()
    .text('Pick a user')
    .fallback('Pick a user')
    .callbackId('user_callback')
    .select()
      .name('option_group')
      .text('Static Option Groups')
      .optionGroup()
        .text('Option header')
        .option('some text', 'a value')
        .option('some more text', 'moar value')
      .end()
      .optionGroup()
        .text('Second Option header')
        .option('some text', 'a value')
        .option('some more text', 'moar value')
      .end()
    .end()
  .end()
.json()
```

Produces:

```javascript
{
  "text": "Pick a user",
  "attachments": [
    {
      "text": "Pick a user",
      "fallback": "Pick a user",
      "callback_id": "user_callback",
      "actions": [
        {
          "type": "select",
          "name": "option_group",
          "text": "Static Option Groups",
          "option_groups": [
            {
              "text": "Option header",
              "options": [
                {
                  "text": "some text",
                  "value": "a value"
                },
                {
                  "text": "some more text",
                  "value": "moar value"
                }
              ]
            },
            {
              "text": "Second Option header",
              "options": [
                {
                  "text": "some text",
                  "value": "a value"
                },
                {
                  "text": "some more text",
                  "value": "moar value"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}

```
### Modifying Original Messages

Slack message builder can also be used to modify existing messages, such as the `original_message` that comes with an interactive message action. Consider the following example that uses the [Slapp](https://github.com/missionsai/slapp) framework.

```javascript
  const slapp = require('slapp')

  slapp.action('buttonCallbackId', 'action', (msg) => {
    msg.respond(smb(msg.body.original_message)
          .attachments.get(-1) // get the last attachment
            .buttons(null) // remove the buttons
            .text(`:white_check_mark: got it`) // add some confirmation text
          .end()
        .json())
  })
```

### Using JSON
Mix and match JSON documents with slack-message-builder's functions

```javascript
smb()
  .text("I am a test message")
  .attachments([{"text": "And Here's an attachment!", "color":"#3AA3E3"}])
  .json()
```

```javascript
smb()
  .attachment()
  .fields([{"title": "title", "value":"value"}])
  .end()
  .json()
```
