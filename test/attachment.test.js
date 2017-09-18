'use strict'

const test = require('ava').test
const camelcase = require('camelcase')
const Attachment = require('../src/attachment')

test('Atachment()', t => {
  var a = Attachment().json()

  t.deepEqual(a, { text: '' })
})

test('Atachment() with string', t => {
  var text = 'test'
  var a = Attachment(text).json()

  t.deepEqual(a, { text })
})

test('Attachment() with chained props', t => {
  var a = Attachment()
    .text(attachment.text)
    .title(attachment.title)
    .titleLink(attachment.title_link)
    .fallback(attachment.fallback)
    .callbackId(attachment.callback_id)
    .color(attachment.color)
    .pretext(attachment.pretext)
    .authorName(attachment.author_name)
    .authorSubname(attachment.author_subname)
    .authorLink(attachment.author_link)
    .authorIcon(attachment.author_icon)
    .imageUrl(attachment.image_url)
    .thumbUrl(attachment.thumb_url)
    .footer(attachment.footer)
    .footerIcon(attachment.footer_icon)
    .ts(attachment.ts)
    .actions(attachment.actions)
    .fields(attachment.fields)
    .json()

  Object.keys(attachment).forEach(prop => {
    t.deepEqual(a[prop], attachment[prop])
  })
})

test('Attachment() with object', t => {
  var a = Attachment(attachment).json()

  t.deepEqual(a, attachment)
})

test('Attachment().button()', t => {
  var name = 'button name'
  var text = 'button text'

  var a = Attachment()
    .button(name, text).end()
    .json()

  t.is(a.actions.length, 1)
  t.is(a.actions[0].name, name)
  t.is(a.actions[0].text, text)
})

test('Attachment().select()', t => {
  var name = 'select name'
  var text = 'select text'

  var a = Attachment()
    .select(name, text).end()
    .json()

  t.is(a.actions.length, 1)
  t.is(a.actions[0].name, name)
  t.is(a.actions[0].text, text)
})

test('Attachment().actions()', t => {
  var button1 = {
    name: 'button1 name',
    text: 'button1 text',
    value: 'button1 value',
    confirm: {
      title: 'confirm title',
      text: 'confirm text',
      ok_text: 'confirm ok text',
      dismiss_text: 'confirm dismiss text'
    }
  }
  var button2 = {
    name: 'button2 name',
    text: 'button2 text',
    value: 'button2 value',
    style: 'primary'
  }

  var a = Attachment()
    .actions([button1, button2])
    .json()

  t.is(a.actions.length, 2)
  t.is(a.actions[0].name, button1.name)
  t.is(a.actions[0].text, button1.text)
  t.is(a.actions[0].value, button1.value)
  t.is(a.actions[0].confirm.title, button1.confirm.title)
  t.is(a.actions[0].confirm.text, button1.confirm.text)
  t.is(a.actions[0].confirm.ok_text, button1.confirm.ok_text)
  t.is(a.actions[0].confirm.dismiss_text, button1.confirm.dismiss_text)

  t.is(a.actions[1].name, button2.name)
  t.is(a.actions[1].text, button2.text)
  t.is(a.actions[1].value, button2.value)
  t.is(a.actions[1].style, button2.style)
})

test('Attachment().field()', t => {
  var title = 'field title'
  var value = 'field value'
  var short = true

  var a = Attachment()
    .field()
      .title(title)
      .value(value)
      .short(short)
      .end()
    .json()

  t.is(a.fields.length, 1)
  t.is(a.fields[0].title, title)
  t.is(a.fields[0].value, value)
  t.is(a.fields[0].short, short)
})

test('Attachment() property get()', t => {
  var a = Attachment(attachment)

  Object.keys(attachment).forEach(prop => {
    var val = attachment[prop]
    var getVal = a[camelcase(prop)].get()

    // Flattens object out and normalizes to json structure
    var jsonGetVal = JSON.parse(JSON.stringify(getVal))
    t.deepEqual(jsonGetVal, val, `${prop} does not match`)
  })
})

test('Attachment().actions.get()', t => {
  var a = Attachment()
    .actions(attachment.actions)

  t.deepEqual(JSON.parse(JSON.stringify(a.actions.get())), attachment.actions)
})

test('Attachment().buttons.get()', t => {
  var a = Attachment()
    .buttons(attachment.actions)

  t.true(Array.isArray(a.buttons.get()))
  t.is(a.buttons.get().length, attachment.actions.length)
  t.deepEqual(JSON.parse(JSON.stringify(a.buttons.get())), attachment.actions)
})

test('Attachment().actions.get() w/ index', t => {
  var a = Attachment()
    .actions(attachment.actions)

  t.deepEqual(JSON.parse(JSON.stringify(a.actions.get(0))), attachment.actions[0])
  t.deepEqual(JSON.parse(JSON.stringify(a.actions.get(1))), attachment.actions[1])
  t.deepEqual(JSON.parse(JSON.stringify(a.actions.get(-1))), attachment.actions[1])
  t.deepEqual(JSON.parse(JSON.stringify(a.actions.get(-2))), attachment.actions[0])
})

test('Attachment().fields() w/ null', t => {
  var a = Attachment()
    .fields(null)

  t.truthy(a)
  t.is(a.data.fields, null)
  t.falsy(a.end())
})

test('Attachment().actions() w/ null', t => {
  var a = Attachment()
    .actions(null)

  t.truthy(a)
  t.is(a.data.actions, null)
  t.falsy(a.end())
})

const attachment = {
  text: 'attachment text',
  title: 'attachment title',
  title_link: 'https://beepboophq.com',
  fallback: 'attachment fallback',
  callback_id: 'attachment callback_id',
  color: '#D9488F',
  pretext: 'attachment pretext',
  author_name: 'attachment author_name',
  author_subname: 'attachment author_subname',
  author_link: 'https://beepboophq.com/author',
  author_icon: 'https://beepboophq.com/author_icon',
  image_url: 'https://beepboophq.com/image',
  thumb_url: 'https://beepboophq.com/thumb',
  footer: 'attachment footer',
  footer_icon: 'https://beepboophq.com/footer_icon',
  ts: Date.now(),
  actions: [
    {
      name: 'button1 name',
      text: 'button1 text',
      value: 'button1 value',
      type: 'button',
      confirm: {
        title: 'confirm title',
        text: 'confirm text',
        ok_text: 'confirm ok text',
        dismiss_text: 'confirm dismiss text'
      }
    },
    {
      name: 'button2 name',
      text: 'button2 text',
      type: 'button'
    }
  ],
  fields: [{
    title: 'field title',
    value: 12889893,
    short: true
  }]
}
