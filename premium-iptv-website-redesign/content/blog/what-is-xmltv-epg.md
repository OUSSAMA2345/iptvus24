---
{
  "priority": 13,
  "status": "ready",
  "seoTitle": "What Is XMLTV EPG? A Practical Guide to Television Schedule Data",
  "slug": "what-is-xmltv-epg",
  "metaTitle": "What Is XMLTV EPG? Channels, Times and Guide Data",
  "metaDescription": "Understand XMLTV programme guides: channel IDs, timestamps, timezone offsets, coverage and refresh. Learn why video can work while schedule rows stay empty.",
  "h1": "What Is XMLTV EPG? A Practical Guide to Television Schedule Data",
  "category": "Streaming basics",
  "publishedAt": "2026-11-27",
  "reviewedAt": "2026-11-27",
  "keywords": [
    "what is xmltv epg",
    "XMLTV channel IDs",
    "XMLTV timestamps"
  ],
  "editorialMethod": "Documentation-based editorial guide, researched against official documentation and competing search results. No hands-on testing or independent expert review is claimed.",
  "imageRecommendations": [
    "Create an original diagram: Annotated fictional XMLTV record. Use fictional labels, accessible contrast and descriptive alt text; no channel logos, broadcast frames or product-photo imitation.",
    "Create an original explanatory graphic: Retrieval parsing matching and display stages. Use generic shapes and clearly labelled examples, not copyrighted app screens or invented test results."
  ],
  "internalLinkOpportunities": [
    "/blog/how-to-organize-iptv-channels",
    "/blog/iptv-epg-not-updating"
  ],
  "articleJsonLd": {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": "https://www.iptvus24.com/blog/what-is-xmltv-epg#article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.iptvus24.com/blog/what-is-xmltv-epg"
    },
    "headline": "What Is XMLTV EPG? A Practical Guide to Television Schedule Data",
    "description": "Understand XMLTV programme guides: channel IDs, timestamps, timezone offsets, coverage and refresh. Learn why video can work while schedule rows stay empty.",
    "datePublished": "2026-11-27",
    "dateModified": "2026-11-27",
    "inLanguage": "en",
    "author": {
      "@type": "Organization",
      "name": "IPTVUS24 Editorial",
      "url": "https://www.iptvus24.com/about"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IPTVUS24",
      "url": "https://www.iptvus24.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.iptvus24.com/brand/icon-1024.png"
      }
    },
    "keywords": "what is xmltv epg, XMLTV channel IDs, XMLTV timestamps",
    "url": "https://www.iptvus24.com/blog/what-is-xmltv-epg",
    "image": {
      "@type": "ImageObject",
      "url": "https://www.iptvus24.com/images/guides/what-is-xmltv-epg.png",
      "width": 1200,
      "height": 630,
      "caption": "IPTVUS24 streaming guides and device advice"
    },
    "articleSection": "Streaming basics"
  },
  "faqJsonLd": {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.iptvus24.com/blog/what-is-xmltv-epg#faq",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does XMLTV stand for in an IPTV setup?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It refers to an XML-based television-listings format used to supply schedule information. A compatible player reads channel and programme records to build an electronic programme guide. XMLTV is not a content subscription, a video codec, or an archive of the programmes themselves. Its usefulness depends on correct retrieval, matching identifiers, relevant date coverage, and accurate times supplied by the source."
        }
      },
      {
        "@type": "Question",
        "name": "Is an XMLTV file the same as an M3U playlist?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. A channel playlist generally describes viewing entries and media locations, while XMLTV describes programme schedules associated with channel identifiers. A player often combines them to show channel names beside current and future programmes. Either source can work while the other fails. Replacing stream credentials is therefore not the right first response to a blank guide when live video already plays."
        }
      },
      {
        "@type": "Question",
        "name": "Does XMLTV include live television streams?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not as its core schedule function. It describes channels and programme metadata rather than carrying the audiovisual stream. A guide entry does not grant viewing rights or ensure that the media is available. You still need an authorized content source and a compatible playback method. Keep schedule troubleshooting separate from account entitlement and video-delivery problems."
        }
      },
      {
        "@type": "Question",
        "name": "Why do channel IDs matter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "They connect programme records to the intended schedule channel and help the player associate guide data with viewing entries. Similar display names can refer to different regions or variants, so names alone are not always reliable. Preserve technical identifiers when renaming channels for convenience, and check one known channel's key before repeatedly clearing an entire guide database."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if a timestamp has no timezone?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The XMLTV DTD says UTC is assumed when no explicit timezone is supplied. If the source writer intended local time instead, the displayed schedule can shift. Check the actual timestamp and the player's display timezone before applying corrections. A global offset can conceal a source mistake temporarily and become wrong again after a seasonal time change."
        }
      },
      {
        "@type": "Question",
        "name": "Can XMLTV provide catch-up television?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A past schedule record can help a player present a catch-up interface, but it does not create the archived video or permission to play it. The content service must supply and authorize that media, and the player must support its access method. Seeing yesterday's programme title in the guide is not confirmation that replay is included in your account."
        }
      },
      {
        "@type": "Question",
        "name": "How often should I refresh an XMLTV guide?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use the source's documented update cadence and the player's supported scheduling controls. There is no universal interval that improves every feed. Excessive refreshes can waste data or trigger limits while retrieving unchanged information. Check whether coverage has actually advanced; if the source remains stale, report that evidence rather than repeatedly deleting and rebuilding the local guide."
        }
      },
      {
        "@type": "Question",
        "name": "Does valid XML guarantee a correct EPG?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. Structural validity does not prove current coverage, accurate programme times, correct regional mapping, or truthful metadata. A file can parse cleanly and still describe last week's schedule or another channel variant. Validate structure where appropriate, then inspect representative identifiers, dates, and displayed results. Those checks answer different questions and should not be collapsed into a single success message."
        }
      }
    ]
  }
}
---

# What Is XMLTV EPG? A Practical Guide to Television Schedule Data

XMLTV describes television schedules in a structured text format. It tells a compatible application which programmes belong to which channels and when they are scheduled. It does not carry the video itself, sell channel access, or guarantee that a listed programme is available to watch.

**An XMLTV EPG is programme-guide data expressed as XML: channel records identify services, and programme records attach titles, times, and optional metadata to those channels. A player must retrieve the file, parse it, match its channel identifiers, and display the relevant schedule period.** Each step can succeed or fail independently.

Understanding that sequence explains a familiar situation: a live channel plays normally, but its guide row says “No information.” The media path works while the schedule path does not. This article explains the format before the repair steps, with a small fictional example and clear limits on what XMLTV can provide.

## Table of contents

- [EPG, XMLTV, and playlists describe different things](#epg-xmltv-and-playlists-describe-different-things)
- [Read the format through a small example](#read-the-format-through-a-small-example)
- [How channel matching works](#how-channel-matching-works)
- [Understand timestamps and timezone offsets](#understand-timestamps-and-timezone-offsets)
- [A feed has coverage, not infinite knowledge](#a-feed-has-coverage-not-infinite-knowledge)
- [Delivery, compression, and refresh](#delivery-compression-and-refresh)
- [Troubleshooting XMLTV in the order it is used](#troubleshooting-xmltv-in-the-order-it-is-used)
- [A one-channel inspection exercise](#a-one-channel-inspection-exercise)
- [Common mistakes when working with XMLTV](#common-mistakes-when-working-with-xmltv)
- [Best practices for selecting and maintaining a guide](#best-practices-for-selecting-and-maintaining-a-guide)
- [Frequently asked questions](#frequently-asked-questions)
- [Conclusion](#conclusion)

## EPG, XMLTV, and playlists describe different things

EPG means electronic programme guide. It is the schedule experience a viewer sees, such as a grid of current and upcoming programmes. XMLTV is one format used to supply the data behind that experience. An application may support other schedule interfaces as well; EPG is not synonymous with one file extension.

A channel playlist commonly identifies viewing choices and the addresses used to request media. XMLTV supplies schedule records associated with channel identifiers. The app joins those sources. A matching guide entry does not authorize playback, and a working stream does not automatically populate the schedule.

| Component | Main question it answers | What it does not supply by itself |
| --- | --- | --- |
| Channel playlist | What can the player request? | Complete programme schedules |
| XMLTV channel record | Which schedule service is this? | A guaranteed playable media stream |
| XMLTV programme record | What is scheduled and when? | Permission to watch or record |
| Player | How should the sources be displayed? | Distribution rights to the catalogue |
| Content service | Which media can this account access? | Universal compatibility with every player |

### Why this separation is useful

It lets a service update schedules without changing every stream address, and it lets a player display a guide from a supported schedule source. It also creates integration work: channel keys, coverage, time interpretation, refresh policy, and metadata support must align. A guide is not healthy merely because a URL downloads successfully.

## Read the format through a small example

The XMLTV project maintains a public [document type definition](https://raw.githubusercontent.com/XMLTV/xmltv/master/xmltv.dtd), or DTD, describing the format's structure and conventions. The example below is deliberately small and fictional. It shows the relationship between one channel identifier and one programme, not a real schedule service or a content recommendation.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE tv SYSTEM "xmltv.dtd">
<tv>
  <channel id="demo.local">
    <display-name>Demo Learning</display-name>
  </channel>
  <programme start="20261127180000 +0000"
             stop="20261127183000 +0000"
             channel="demo.local">
    <title lang="en">An Example Programme</title>
    <desc lang="en">Fictional schedule data for illustration.</desc>
  </programme>
</tv>
```

The `channel` record identifies the schedule service using `id`. Its display name is a human-readable label. The programme's `channel` attribute points back to that identifier. The start and stop values describe the airing window, while title and description provide text the app may display.

A real feed can contain many channels and programmes plus additional metadata. The DTD allows optional information that a particular player may ignore. A file being structurally valid does not mean every application will display every field or infer the same missing details.

### Channel IDs are keys, not branding

An identifier such as `demo.local` need not be a website you can visit. Its job is to distinguish the schedule channel within the data and connect the relevant records. The visible label can change while the technical key remains stable. Two different channels can also have similar names without sharing an identity.

## How channel matching works

A player needs a relationship between the channel in its viewing catalogue and the channel in the guide. In common extended-M3U workflows, a guide-related playlist attribute can provide the key, but support varies by player and source method. Do not assume every import uses identical matching rules.

If the source playlist uses one identifier and XMLTV uses another, the app may show a blank row even when both resources download correctly. Some players offer manual assignment or name-based matching, but names are ambiguous across regions, languages, quality variants, and time-shifted services.

Begin with one known channel. Find its schedule identifier and confirm that programme records reference it during the time window you care about. Then inspect how the player associates the viewing entry with that key. This targeted check is more informative than repeatedly clearing the entire guide database.

### Keep organization separate from identity

Renaming a channel for household convenience should ideally change only its display label. Editing its technical identifier can break guide matching. If you are reorganizing a playlist, preserve a private original and test one entry before making broad changes. The [channel-organization guide](/blog/how-to-organize-iptv-channels) explains that distinction in a practical workflow.

## Understand timestamps and timezone offsets

XMLTV's DTD describes timestamps based on a compact date-and-time notation. A full value such as `20261127180000 +0000` represents a date and time with an explicit UTC offset. The DTD says UTC is assumed when no explicit timezone is supplied. It also permits less complete timestamps in contexts where only partial information is known.

For ordinary programme schedules, explicit complete timestamps are easier to reason about. A local time written without its intended offset can be interpreted as UTC and land in the wrong viewing slot. That is a source-data issue, not necessarily evidence that the television's timezone setting is wrong.

The player's display timezone is another layer. A correctly expressed airing instant can be shown in the viewer's local time. If both the source and player are adjusted to compensate for the same perceived error, the result can be a double shift. Record original values before changing offsets.

### Daylight saving is date-dependent

An offset applicable in one season may be wrong in another. Do not apply a permanent one-hour correction merely because a guide is wrong today. Check whether the source represents airing times correctly for the relevant dates and whether the device uses the correct location and clock configuration.

If only one channel is shifted, inspect that channel's feed and mapping before changing a global setting. If every channel is consistently shifted, the device clock, display timezone, or source-wide convention deserves attention. The pattern matters more than the size of a guessed correction.

## A feed has coverage, not infinite knowledge

A guide can contain a valid channel record but no programmes for today. It may cover only selected channels, a limited future horizon, or an already expired date range. A successful download does not establish current coverage. Check the earliest and latest relevant programme dates before changing player settings.

Schedule quality also depends on the source's update process. Last-minute changes, cancellations, regional variations, and live-event overruns may not appear immediately. XMLTV can represent schedule information but does not guarantee that the supplied schedule matches reality at every moment.

A very large file can be less useful than a smaller accurate one if most channels are irrelevant or dates are stale. Consider coverage and freshness separately from raw channel count. A provider advertising thousands of guide rows may still lack the particular regional variant your household watches.

### Catch-up is not created by guide data

A past programme in the guide does not necessarily mean it can be replayed. Catch-up requires the content service to retain and authorize the media, and the player must support its access method. XMLTV describes the schedule; it does not store an archive or create recording rights.

## Delivery, compression, and refresh

XMLTV is a data format, not a single hosting arrangement. A source may provide a downloadable XML file, a compressed version, or an authenticated endpoint that returns schedule data. The player must support the actual delivery method. An address ending in a familiar extension is not proof of its response content.

A server can redirect, return a login page, refuse access, or provide an error document instead of XML. If the guide fails to import, verify the documented endpoint and authentication through trusted support. Do not send a private URL to an unknown online validator simply because the link looks like a harmless schedule file.

Compression can reduce transfer size, but the application must support the format returned. Likewise, encoding, malformed characters, or incomplete downloads can interfere with parsing. Separate retrieval success from XML validity and from the later channel-matching stage.

### Refresh according to the source's cadence

Refreshing every minute does not improve a feed updated only periodically. It can increase server load, consume data, and trigger rate limits. Use documented automatic refresh settings that suit the source and the device. If the provider acknowledges stale coverage, repeated local clearing will only download the same stale schedule.

## Troubleshooting XMLTV in the order it is used

Start with retrieval: does the app successfully fetch the intended feed? Next check parsing: does it accept the returned data? Then inspect matching: are the viewing channels associated with the correct guide identifiers? Finally check coverage and display time. Those questions prevent one symptom from generating unrelated fixes.

For a blank row, test one channel before the whole catalogue. A valid programme record for that key and date narrows the problem toward association or display. No programme records for the period points toward source coverage. Wrong titles can indicate a mapping to a different regional or similarly named channel.

For a uniform time shift, compare the device clock, local timezone, explicit source offset, and any app-level correction. For selective shifts, examine the affected channel records. Do not apply a global offset to repair one mismatched service and disrupt the channels that were already correct.

### Preserve the working media configuration

If channels play, leave their access details alone while repairing the guide. Deleting the playlist can remove favorites and mappings without improving schedule data. The [EPG-not-updating workflow](/blog/iptv-epg-not-updating) offers a symptom-based sequence when you already have a specific broken guide to investigate.

## A one-channel inspection exercise

Consider the fictional Demo Learning record above. Imagine that its live video plays on the television but the guide is empty at the example programme time. Start by asking whether the player retrieved the expected document, rather than whether the video address is correct. If it received an HTML sign-in page, the investigation is still at retrieval, before channel matching has begun.

If the document parses, inspect the channel key. The programme references `demo.local`, so the player needs an association between its viewing entry and that schedule identifier. A display name reading Demo Learning is helpful to a person but does not guarantee the application uses that label as the matching key. Check the configured association through the player's documented controls.

Next, inspect the date window. The example describes one half-hour on one date. Opening the guide a week later should not be expected to display that programme as current. Likewise, an empty row tomorrow can be a coverage limitation even though today's record appears correctly. This is why a feed's latest relevant programme matters more than the file's download timestamp alone.

Finally, reason about the instant rather than changing offsets by trial and error. The example's explicit zero offset identifies its reference time. A viewer elsewhere may see a different local clock label for that same instant. Verify the intended local conversion using the device's correct timezone, and do not modify both the source and app merely to make two labels visually identical.

### What validation can and cannot tell you

A trusted XML parser can identify malformed structure, and DTD-aware validation can check the document against supported structural rules. Neither can tell whether Demo Learning really plans to broadcast the fictional programme. That requires a trustworthy schedule source. Neither can establish distribution rights to descriptions, artwork, or media attached elsewhere in the system.

For a feed you generate yourself, maintain small test cases that cover an ordinary programme, a date boundary, a seasonal timezone transition where relevant, and a missing optional field. Check the target player's actual display as well as the file. An application may implement only part of the available metadata, so your compatibility tests should reflect the viewer's required tasks.

For a feed supplied by someone else, avoid rewriting its entire schedule to repair one suspected mismatch. Preserve the original example, collect the exact key and time window privately, and ask the source owner to verify the record. A local workaround can be reasonable when documented, but it should not conceal a recurring source error that will affect other users at the next update.

## Common mistakes when working with XMLTV

One common error is treating display names as guaranteed identifiers. Another is assuming every feed without an explicit offset is local time; the DTD's stated default is UTC. A third is confusing a well-formed XML document with accurate, current schedule data. These are different kinds of correctness.

Do not assume that every optional element will appear in the player's interface. Rich metadata can be present in the file but unsupported by the app. Conversely, a player may derive a visual presentation from limited information. Check its documentation before concluding that missing artwork or episode labels prove the whole feed is broken.

Avoid publishing private examples copied from a real account. Replace tokens, hostnames where necessary, account names, and programme data you are not entitled to redistribute. Schedule text and artwork can have licensing terms even though the XMLTV format itself is publicly documented.

## Best practices for selecting and maintaining a guide

Choose a source with clear provenance, appropriate rights, relevant regional coverage, and a reasonable update process. Prefer accurate identifiers and dates over exaggerated catalogue counts. Ask what the feed covers, how frequently it updates, and whom to contact when a particular service is missing.

Keep a small known-good sample for comparison: one channel identifier, a current programme window, and the expected local display time. Store private access details securely. This gives support something concrete without requiring you to send the entire schedule file or account configuration.

### For people generating their own feed

Use the XMLTV project's maintained specification and validate with trusted local tooling. Keep identifiers stable, express time unambiguously, escape XML text correctly, and verify representative dates around timezone changes. Structural validation is only one check; also inspect overlapping events, missing coverage, and the actual data shown in your target player.

For untrusted XML, use parsers configured securely and avoid automatically resolving arbitrary external resources. A consumer guide app should handle this safely, but custom scripts need their own safeguards. Do not fetch a remote DTD or follow embedded references without understanding the parser's behavior and trust boundary.

## Frequently asked questions

### What does XMLTV stand for in an IPTV setup?

It refers to an XML-based television-listings format used to supply schedule information. A compatible player reads channel and programme records to build an electronic programme guide. XMLTV is not a content subscription, a video codec, or an archive of the programmes themselves. Its usefulness depends on correct retrieval, matching identifiers, relevant date coverage, and accurate times supplied by the source.

### Is an XMLTV file the same as an M3U playlist?

No. A channel playlist generally describes viewing entries and media locations, while XMLTV describes programme schedules associated with channel identifiers. A player often combines them to show channel names beside current and future programmes. Either source can work while the other fails. Replacing stream credentials is therefore not the right first response to a blank guide when live video already plays.

### Does XMLTV include live television streams?

Not as its core schedule function. It describes channels and programme metadata rather than carrying the audiovisual stream. A guide entry does not grant viewing rights or ensure that the media is available. You still need an authorized content source and a compatible playback method. Keep schedule troubleshooting separate from account entitlement and video-delivery problems.

### Why do channel IDs matter?

They connect programme records to the intended schedule channel and help the player associate guide data with viewing entries. Similar display names can refer to different regions or variants, so names alone are not always reliable. Preserve technical identifiers when renaming channels for convenience, and check one known channel's key before repeatedly clearing an entire guide database.

### What happens if a timestamp has no timezone?

The XMLTV DTD says UTC is assumed when no explicit timezone is supplied. If the source writer intended local time instead, the displayed schedule can shift. Check the actual timestamp and the player's display timezone before applying corrections. A global offset can conceal a source mistake temporarily and become wrong again after a seasonal time change.

### Can XMLTV provide catch-up television?

A past schedule record can help a player present a catch-up interface, but it does not create the archived video or permission to play it. The content service must supply and authorize that media, and the player must support its access method. Seeing yesterday's programme title in the guide is not confirmation that replay is included in your account.

### How often should I refresh an XMLTV guide?

Use the source's documented update cadence and the player's supported scheduling controls. There is no universal interval that improves every feed. Excessive refreshes can waste data or trigger limits while retrieving unchanged information. Check whether coverage has actually advanced; if the source remains stale, report that evidence rather than repeatedly deleting and rebuilding the local guide.

### Does valid XML guarantee a correct EPG?

No. Structural validity does not prove current coverage, accurate programme times, correct regional mapping, or truthful metadata. A file can parse cleanly and still describe last week's schedule or another channel variant. Validate structure where appropriate, then inspect representative identifiers, dates, and displayed results. Those checks answer different questions and should not be collapsed into a single success message.

## Conclusion

XMLTV is the schedule layer, not the television service itself. Once you understand channel keys, programme windows, time offsets, and coverage, an empty or shifted guide becomes a set of testable questions. Preserve working playback, verify the data in the order the player uses it, and distinguish a readable file from a guide that is actually useful today.
