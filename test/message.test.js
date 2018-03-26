'use strict'

const test = require('ava').test
const camelcase = require('camelcase')
const sm = require('../index')

const text = 'this is my message'
const iconEmoji = 'icon_emoji'

test('slackmessage() with just text', t => {
  var msg = sm(text).json()

  t.is(msg.text, text)
})

test('slackmessage() with an object w/ just text', t => {
  var msg = sm({ text }).json()

  t.is(msg.text, text)
})

test('slackmessage() with a full message object', t => {
  var msg = sm(message).json()
  t.deepEqual(msg, message)
})

test('slackmessage() with chained setters', t => {
  var msg = sm()
    .text(message.text)
    .responseType(message.response_type)
    .replaceOriginal(message.replace_original)
    .deleteOriginal(message.delete_original)
    .token(message.token)
    .channel(message.channel)
    .user(message.user)
    .parse(message.parse)
    .linkNames(message.link_names)
    .unfurlLinks(message.unfurl_links)
    .unfurlMedia(message.unfurl_media)
    .asUser(message.as_user)
    .iconUrl(message.icon_url)
    .threadTs(message.thread_ts)
    .ts(message.ts)
    .replyBroadcast(message.reply_broadcast)
    .attachments(message.attachments)
    .json()

  t.deepEqual(msg, message)
})

test('slackmessage() with chained setters and chained attachment', t => {
  var msg = sm()
    .text(message.text)
    .responseType(message.response_type)
    .replaceOriginal(message.replace_original)
    .deleteOriginal(message.delete_original)
    .token(message.token)
    .channel(message.channel)
    .user(message.user)
    .parse(message.parse)
    .linkNames(message.link_names)
    .unfurlLinks(message.unfurl_links)
    .unfurlMedia(message.unfurl_media)
    .asUser(message.as_user)
    .iconUrl(message.icon_url)
    .threadTs(message.thread_ts)
    .ts(message.ts)
    .replyBroadcast(message.reply_broadcast)
    .attachment()
      .text(message.attachments[0].text)
      .title(message.attachments[0].title)
      .titleLink(message.attachments[0].title_link)
      .fallback(message.attachments[0].fallback)
      .callbackId(message.attachments[0].callback_id)
      .color(message.attachments[0].color)
      .pretext(message.attachments[0].pretext)
      .authorName(message.attachments[0].author_name)
      .authorSubname(message.attachments[0].author_subname)
      .authorLink(message.attachments[0].author_link)
      .authorIcon(message.attachments[0].author_icon)
      .imageUrl(message.attachments[0].image_url)
      .thumbUrl(message.attachments[0].thumb_url)
      .footer(message.attachments[0].footer)
      .footerIcon(message.attachments[0].footer_icon)
      .ts(message.attachments[0].ts)
      .button()
        .name(message.attachments[0].actions[0].name)
        .text(message.attachments[0].actions[0].text)
        .value(message.attachments[0].actions[0].value)
        .type(message.attachments[0].actions[0].type)
        .confirm()
          .title(message.attachments[0].actions[0].confirm.title)
          .text(message.attachments[0].actions[0].confirm.text)
          .okText(message.attachments[0].actions[0].confirm.ok_text)
          .dismissText(message.attachments[0].actions[0].confirm.dismiss_text)
        .end()
      .end()
      .button()
        .name(message.attachments[0].actions[1].name)
        .text(message.attachments[0].actions[1].text)
        .type(message.attachments[0].actions[1].type)
      .end()
      .field()
        .title(message.attachments[0].fields[0].title)
        .value(message.attachments[0].fields[0].value)
        .short(message.attachments[0].fields[0].short)
      .end()
      .select()
        .name(message.attachments[0].actions[2].name)
        .text(message.attachments[0].actions[2].text)
        .dataSource(message.attachments[0].actions[2].data_source)
      .end()
    .end()
    .attachment()
      .text(message.attachments[1].text)
      .title(message.attachments[1].title)
    .end()
    .json()

  t.deepEqual(msg, message)
})

test('slackmessage() property get()', t => {
  var m = sm(message)

  Object.keys(message).forEach(prop => {
    var val = message[prop]
    var getVal = m[camelcase(prop)].get()

    // Flattens object out and normalizes to json structure
    var jsonGetVal = JSON.parse(JSON.stringify(getVal))
    t.deepEqual(jsonGetVal, val, `${prop} does not match`)
  })
})

test('slackmessage().attachments.get()', t => {
  var m = sm()
    .attachments(message.attachments)

  t.deepEqual(JSON.parse(JSON.stringify(m.attachments.get())), message.attachments)
})

test('slackmessage().attachments.get() w/ index', t => {
  var m = sm()
    .attachments(message.attachments)

  t.deepEqual(JSON.parse(JSON.stringify(m.attachments.get(0))), message.attachments[0])
  t.deepEqual(JSON.parse(JSON.stringify(m.attachments.get(1))), message.attachments[1])
  t.deepEqual(JSON.parse(JSON.stringify(m.attachments.get(-1))), message.attachments[1])
  t.deepEqual(JSON.parse(JSON.stringify(m.attachments.get(-2))), message.attachments[0])
})

test('slackmessage().username()', t => {
  var m = sm()
    .username('test')
    .json()

  t.is(m.username, 'test')
  t.false(m.as_user)
})

test('slackmessage().attachments() w/ null', t => {
  var m = sm()
    .attachments(null)

  t.truthy(m)
  t.is(m.data.attachments, null)
})

test('slackmessage().icon_emoji()', t => {
  var m = sm()
    .iconEmoji(iconEmoji)

  t.truthy(m)
  t.is(m.data.icon_emoji, iconEmoji)
  t.false(m.data.as_user)
})

test('slackmessage().toJSON() ', t => {
  var m = sm(message)
  t.truthy(m)
  t.deepEqual(m.toJSON(), m.json())
})

const message = {
  text: 'message text',
  response_type: 'ephemeral',
  replace_original: false,
  delete_original: false,
  token: 'XIUUS9009',
  channel: 'C1188HKK',
  user: 'U12345678',
  parse: true,
  link_names: true,
  unfurl_links: false,
  unfurl_media: false,
  as_user: false,
  icon_url: 'https://beepboophq.com/icon',
  thread_ts: '1231231231312312',
  ts: '11111111.1111111',
  reply_broadcast: true,
  attachments: [
    {
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
        },
        {
          type: 'select',
          name: 'menu1 name',
          text: 'menu2 text',
          data_source: 'channels'
        }
      ],
      fields: [{
        title: 'field title',
        value: 12889893,
        short: true
      }]
    },
    {
      text: 'second attachment',
      title: 'second attachment title'
    }
  ]
}
