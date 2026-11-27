# Research ledger — priorities 1–20

Research date: 27 November 2026. Priorities 1–5 were researched in the earlier merged batch. The continuation below records the remaining 15 topics, researched before drafting in priority order.

## Method and limits

For each of the first five topics, current search-result extracts were examined before drafting. Official documentation was used to verify platform behavior, the player's role, and XMLTV semantics. Competitor observations below describe the sampled results, not guaranteed ranking positions in every country or a comprehensive competitive crawl. No competitor prose was copied into the articles.

The content offers original diagnostic organization, fictional worked examples clearly labeled as such, and conditional reasoning. It does not claim laboratory testing, customer case studies, professional certifications, independent expert review, a web-wide plagiarism clearance, or guaranteed superiority/rankings. Menu paths are qualified where versions differ.

## Primary sources consulted

1. Amazon: [Fire TV network troubleshooting](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYMDPRQTTLXQD7PL). Retrieved the current help page; confirms network status access through Settings → Network → Play/Pause, with additional tools on compatible models, reconnection and restart steps. Model-specific capabilities must not be generalized.
2. Amazon: [Clear app data and cache](https://www.amazon.com/gp/help/customer/display.html?nodeId=GJZBJS5B8VBCGQ48). Retrieved the help page; confirms app-management path and the existence of distinct cache/data operations. Our guidance protects configuration before a data reset rather than treating both buttons as interchangeable.
3. Amazon: [App crashes or will not load](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYANE8DXAEUXTTFX). Retrieved the full help article; supports restart, app recovery, update and reinstall options, not a diagnosis that all crashes are cache problems.
4. Amazon Developer: [Vega announcement, 30 September 2025](https://developer.amazon.com/apps-and-games/blogs/2025/09/announcing-vega-os). Retrieved the article; confirms Fire TV Stick 4K Select introduced Vega, a separate development target, while Fire OS continues. Avoid blanket Android-package installation advice for all Fire TV models.
5. Amazon: [Disabled apps and unlicensed content FAQ](https://www.amazon.com/gp/help/customer/display.html?nodeId=TcmGzCrZPsL5bVHE3Z). Retrieved the policy page. An explicit disabled-app notice is distinct from an outage, login error or absent regional app listing. No enforcement-bypass instructions included.
6. [TiviMate official website](https://tivimate.com/). Retrieved current text: player only; own playlists required; premium unlocks features, not content; intended for Android TV, not optimized for phones/tablets. The page is not a full version-specific menu manual, so the articles do not present every menu label as officially verified or claim unverified permanent mapping behavior.
7. [XMLTV DTD](https://github.com/XMLTV/xmltv/blob/master/xmltv.dtd), also linked in articles at its [raw source](https://raw.githubusercontent.com/XMLTV/xmltv/master/xmltv.dtd). Search extracts were inspected. Page/raw fetch tools failed, so the actual DTD was retrieved through the GitHub contents API using `gh api repos/XMLTV/xmltv/contents/xmltv.dtd` and decoded locally. Verified channel/programme structure and timestamp conventions, including explicit offsets and the UTC assumption when no zone is specified. No claim that all feeds are explicitly marked UTC.

## Priority 1 — firestick buffering but internet is fine

Search: `firestick buffering but internet is fine Amazon Fire TV buffering support WiFi`.

Sampled competing results:
- [Dignited buffering guide](https://www.dignited.com/91598/how-to-better-internet-speeds-fire-tv-fix-buffering/)
- [SpeedtestHQ Fire Stick guide](https://speedtesthq.com/guides/streaming/firestick-slow-streaming-fix)
- [Manbolo buffering guide](https://www.manbolo.com/why-does-my-fire-tv-stick-keep-buffering/)

Observed gaps in extracts: strong claims that Ethernet eliminates buffering permanently; oversimplified conclusions from a fast speed test; heat diagnoses based on elapsed minutes; evening symptoms attributed to throttling without adequate evidence; VPN recommendations ahead of isolation.

Article angle: test the delivery chain rather than upgrade the broadband package. Adds symptom classification, same-device app comparisons, lower-demand and wired tests, interpretation limits, heat/power safety, and a useful support report. Illustrative bitrate arithmetic is explicitly an example, not a universal bandwidth requirement.

Intent boundary: Fire TV playback pauses, not app installation, general multi-device buffering, or router association failures. Links to the app-failure article instead of duplicating its full workflow.

## Priority 2 — iptv epg not updating

Search: `IPTV EPG not updating XMLTV guide troubleshooting gzip timezone`.

Sampled competing results:
- [IPTV Vendors guide](https://iptvvendors.com/fix-iptv-epg-not-working/)
- [IPTVUPG explanation](https://www.iptvupg.com/docs/iptv-epg-explained)
- [EPG XMLTV sync guide](https://virginmediauk.com/step-by-step-epg-xmltv-sync-guide-keep-your-iptv-showtimes-correct/)

Observed gaps: successful retrieval conflated with useful/current coverage; claims that EPG is universally transmitted in UTC; fixed seasonal offsets; suggestions that an account integration guarantees matching; weak distinction between source compression, transport and local storage.

Article angle: retrieval → parsing → matching → coverage. Adds an original valid XMLTV example, file modification versus schedule freshness, cautious identifier repair, double-timezone-correction avoidance, compression differences and private credential handling.

Intent boundary: cross-player EPG freshness and transport diagnosis. The TiviMate article owns the product-specific blank-row/mapping workflow; the existing short EPG overview remains a basic definition article.

## Priority 3 — iptv app not working on firestick

Search: `IPTV app not working on Firestick Amazon clear cache app crashes Vega OS`.

Sampled competing results:
- [Grapevine app-blocking explanation](https://store.grapevine.is/blogs/news/iptv-app-blocked-firestick)
- [Global TV troubleshooting](https://globall-tv.com/iptv-not-working-on-firestick-fix/)
- [IPTVJudge troubleshooting](https://iptvjudge.com/iptv-not-working-fixes/)

Observed gaps: generalized APK/Android instructions; app purchase confused with provider access; resets proposed without a recovery plan; all black screens or app failures treated as source problems; weak separation of an explicit platform notice and normal failures.

Article angle: last successful stage—discovery, installation, launch, authentication, import, playback. Includes current multi-OS context from Amazon, restrained cache/data guidance, account-method distinctions, no bypass instructions, and a support handoff based on the actual failing component.

Intent boundary: Fire TV app lifecycle and account setup. The dedicated buffering article handles repeated playback pauses; the playlist-processing article handles the import spinner.

## Priority 4 — tivimate epg no information

Search: `TiviMate EPG no information official support EPG source channel id`.

Sampled competing results:
- [TiviMatePremiumTV EPG guide](https://tivimatepremiumtv.com/tivimate-epg/)
- [TVimate.co EPG setup](https://tvimate.co/tivimate-epg-setup/)
- [TopIPTVServices EPG guide](https://topiptvservices.com/tivimate-epg/)
- [Community mapping discussion](https://www.reddit.com/r/TiviMate/comments/11fckrf/epg_from_elsewhere/)

These similarly named third-party domains are not treated as official TiviMate documentation.

Observed gaps: unqualified claims about automatic/permanent mapping; hard-coded wait times and source URLs; blanket conclusions from one working row; insufficient regional/timeshift verification; a missing guide treated as failed video.

Article angle: one channel, one source, one interval. Adds control-channel comparisons, version-qualified function labels, careful source-to-playlist assignment, one-row mapping tests, regional verification, source-overlap management, and three fictional diagnostic examples with distinct outcomes.

Intent boundary: TiviMate's blank guide rows and mapping, not generic file transport. XMLTV mechanics are summarized only as needed and linked to priority 2.

## Priority 5 — tivimate playlist is processed please wait

Search: `tivimate playlist is processed please wait stuck fix`.

Sampled competing/community results:
- [Reddit: Add Playlist stuck at processing](https://www.reddit.com/r/TiviMate/comments/ohf0dr/add_playlist_just_gets_stuck_at_processing/)
- [Techkings: Add Playlist error](https://www.techkings.org/threads/tivimate-add-playlist-error.174021/)
- [Reddit: playlist errors](https://www.reddit.com/r/TiviMate/comments/1g1l5gy/error_processing_playlist/)
- [Reddit: error-message discussion](https://www.reddit.com/r/TiviMate/comments/1qlkrog/getting_this_error_message/)

Observed gaps: anecdotal fixes presented as universal; guessed endpoint construction; VPN/DNS and format changes without stage isolation; deleting working playlists before protecting favorites; little distinction between retrieval, parsing and catalogue construction.

Article angle: controlled import-state diagnosis. Adds response versus website reachability, documented endpoint validation, a provider-supported reduced-catalogue test, safe app recovery, minimal illustrative M3U structure, and limits on interpreting another player/network/device comparison. No fixed import-time guarantee or undocumented compatibility matrix.

Intent boundary: import-stage stalls. Guide mapping and video playback get contextual links, not duplicated full chapters.

## Structured-data research

Google's current [Search documentation changelog](https://developers.google.com/search/updates#removing-faq-rich-result) records removal of FAQ rich-result documentation in June 2026 after the feature stopped appearing. FAQPage remains included because it was requested and describes visible questions/answers; it is **not** presented as a way to obtain Google FAQ rich results. Article markup, answer-first sections and clear entities do not guarantee featured snippets, AI Overviews, ChatGPT/Gemini/Perplexity citations, indexing or rankings.

## Outstanding research

Priorities 6–20 require their own current official-source and competitive-result research before drafting. Do not recycle the first five ledgers as evidence that the remaining subjects were researched.

# Continuation — priorities 6–20

## Research method and source caveats

The 15 remaining topics were searched in their requested order before their individual drafts were written. Searches sampled competing result extracts and official documentation; they are not a claim about stable Google positions, an exhaustive SERP crawl, or every regional catalogue. Drafts were composed independently, not by rewriting competitor paragraphs. Follow-up source retrieval and editorial review checked the drafts before final packaging.

Official pages were preferred for device procedures. Full content was retrieved for Infomir external portals, Google TV crash handling, Android TV storage, Samsung app recovery, LG app discovery/installation, Amazon network and blank-screen guidance, TiviMate, the Vega announcement, MDN status codes, and Netflix buffering. XMLTV's full DTD was retrieved through the GitHub contents API and decoded, including its timestamp comments and minimal programme example. Smarters' main site and article fetch failed; the developer-domain search extract was available, so Smarters claims are intentionally limited and qualified by edition. No precise price, permanent platform availability, device allowance, or measured performance ranking is asserted.

Source differences were retained rather than hidden: Amazon's search extract included Up + Rewind resolution cycling while the fetched blank-screen page did not display it. The article says support-page versions vary and directs readers to confirm the shortcut for their model. A Samsung US diagnostic URL redirected to the general TV support hub; the working Latin America English diagnostic page replaced that article link. Samsung Australia's guidance explicitly limits region/model applicability; the content repeatedly directs readers to their local model instructions. LG's 11 November 2026 page distinguishes location menus for webOS 26 from earlier generations. Old community advice to open Wi-Fi security, use obsolete modes, or assume universal channel support was not adopted.

## Primary-source register for the continuation

| Source | Verified contribution |
| --- | --- |
| [Infomir external portal documentation](https://wiki.infomir.eu/eng/set-top-box/stb-linux-webkit/embedded-portal/external-portal-loading) | Local versus external portal, operator responsibility, URL setup, authentication and loading stages |
| [Infomir legacy MAG troubleshooting](https://wiki.infomir.eu/eng/set-top-box/stb-linux-webkit/mag250-254-270) | Network/link checks, page-loading versus blocked-device messages; explicitly scoped to listed models |
| [Google TV app crashes](https://support.google.com/googletv/answer/12364422) | App updates, force stop and developer escalation, not unsupported crash-success percentages |
| [Android TV storage](https://support.google.com/androidtv/answer/6299083) | Uninstalling apps, internal versus removable USB use, formatting erasure and model caveats |
| [Samsung app recovery](https://www.samsung.com/au/support/tv-audio-video/app-not-working-tv/) | Cold boot, updates, reinstall, Smart Hub reset effects and model-year variation |
| [Samsung app management](https://www.samsung.com/au/support/tv-audio-video/download-and-manage-apps-on-your-samsung-tv/) | Reinstall and app controls differ by application and model |
| [Samsung software updates](https://www.samsung.com/us/support/answer/ANS10002051/) | Official update route and active-app caveat; search extract inspected |
| [Samsung self diagnosis](https://www.samsung.com/latin_en/support/tv-audio-video/run-a-self-diagnosis-on-your-samsung-tv-set/) | Smart Hub test checks connection, ISP, Samsung server and application service; current search extract inspected |
| [LG app discovery](https://www.lg.com/us/support/help-library/lg-tv-how-to-find-lg-content-store-apps--20153242600577) | Catalogue lookup by country/model and supported webOS version |
| [LG installation troubleshooting](https://www.lg.com/eg_en/support/product-support/troubleshoot/help-library/cs-CT52008151-20155565108051/) | Model/region support, correct services country, hotspot comparison and 2026 menu differences |
| [LG installation and removal](https://www.lg.com/uk/support/product-support/troubleshoot/help-library/cs-CT00008333-20154523933049/) | Different Apps/Content Store layouts; older-model installation caveat in current search extract |
| [Amazon blank-screen help](https://www.amazon.com/gp/help/customer/display.html?nodeId=TXyToOIOX7hnR8bTjh) | Direct HDMI, inputs, supplied equipment, CEC and brief 4K transitions |
| [Amazon network help](https://www.amazon.com/gp/help/customer/display.html?nodeId=GYMDPRQTTLXQD7PL) | On-device status, Play/Pause, supported diagnostics and staged reconnect/restart |
| [Amazon cache/data help](https://www.amazon.com/gp/help/customer/display.html?nodeId=GJZBJS5B8VBCGQ48) | Distinct app-management operations; also verified in earlier batch |
| [Amazon Vega announcement](https://developer.amazon.com/apps-and-games/blogs/2025/09/announcing-vega-os) | Stick 4K Select introduced Vega; Fire OS continues; no universal Android-package assumption |
| [TiviMate official site](https://tivimate.com/) | Player only, Android TV target, listed features, verified distribution links; not a complete menu manual |
| [Smarters developer explanation](https://www.iptvsmarters.com/unlock-your-ultimate-streaming-experience-with-ip-tv-smarters-player/) | Search extract distinguishes app features from content; fetch failure limits certainty about platform-specific editions |
| [XMLTV maintained DTD](https://github.com/XMLTV/xmltv/blob/master/xmltv.dtd) | Channel/programme keys, optional stop in minimal example, explicit timezone and UTC default; full source decoded with `gh api` |
| [MDN HTTP reference](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status) | General request-response meanings, not a definitive business-policy diagnosis |
| [Netflix buffering](https://help.netflix.com/en/node/230) and [speed recommendations](https://help.netflix.com/en/node/306) | Same-service connection checks and service-specific stable-speed guidance, not universal IPTV thresholds |
| [Apple HLS overview](https://developer.apple.com/library/archive/referencelibrary/GettingStarted/AboutHTTPLiveStreaming/about/about.html) | Segments, media playlists and variants; official search extract inspected, not a claim all IPTV uses HLS |

## Topic-by-topic intent, competing extracts and original treatment

### 6. MAG box portal not loading

Search: `MAG box portal not loading Infomir support embedded portal external portal URL network`.
Sample: [operator setup tutorial](https://xtremehdiptv.site/how-to-set-up-xtreme-hd-iptv-on-mag-set-top-boxes/) alongside Infomir. Operator-specific example URLs were not reused as recommendations. The article distinguishes local startup, external interface retrieval, account/device authorization and media delivery; it rejects MAC cloning and arbitrary firmware images. Scope is embedded-portal Linux models, not every MAG-branded Android device.

### 7. IPTV channels not loading

Search: `IPTV channels not loading HTTP 403 404 troubleshooting player service`.
Samples: [PlayTVX symptom guide](https://playtvx.com/blog/iptv-not-working/), [third-party TiviMate error guide](https://tivimateplayer.co.uk/tivimate-errors-fix-guide/), [NoxyTV playlist guide](https://noxytv.com/how-to-fix-iptv-playlist-not-loading/). Extracts mapped status codes too confidently to expiry, IP blocking or VPN fixes. The draft separates absent list from failed streams, uses three control items, and treats HTTP codes as request clues. App exit and EPG failures are linked out rather than duplicated.

### 8. IPTV app keeps crashing

Search: `IPTV app keeps crashing Android TV clear cache Google TV official`.
Samples: [BestIPTVIn Android guide](https://bestiptvin.com/iptv-not-working-on-android-tv/), [SmartersTech crash guide](https://iptvsmarterstech.com/blog/fix-streaming-app-crashing/). Rejected unsubstantiated claims that cache causes most crashes or fixes 90 percent, and unverified package mirrors/downgrades. Original emphasis is a reproducible trigger, process exit versus reboot, storage versus RAM and a recovery-cost ladder grounded in Google TV support.

### 9. IPTV app not working on Samsung TV

Search: `IPTV app not working Samsung TV Samsung support app cold boot reinstall Smart Hub`.
Samples: [Technobezz app guide](https://www.technobezz.com/samsung-smart-tv-apps-not-working-fix), [Whizz guide](https://whizz-experts.com/support/smart-devices/samsung-tv-apps-not-loading-2/), [TechnexaHub](https://technexahub.com/tv-guides/samsung-tv-connected-to-internet-but-apps-not-working/). Draft owns single-player launch/activation/playback, checks store availability before deletion, and distinguishes Tizen from Android. Shared multi-app connectivity belongs to topic 17.

### 10. IPTV app not available on LG TV

Search: `IPTV app not available LG TV LG support webOS Content Store region model apps`.
Samples: [Start IPTV missing-listing guide](https://www.stariptv.shop/blog/iptv-app-not-showing-lg-content-store), [IPTVStorm app list](https://iptvstorm.com/blog/best-iptv-apps-lg-smart-tv-2026/), [IPTV One platform guide](https://www.iptv-one.app/en/blog/best-iptv-player-lg-tv-v2). Rejected speculative removal reasons and false-country workarounds. The draft uses a compatibility record, actual services country, missing-listing versus failed-install distinction, and supported alternatives without claiming permanent listings.

### 11. Firestick black screen after logo

Search: `firestick black screen after logo Amazon support blank screen fire TV logo`.
Samples: [SmartTechFAQs](https://smarttechfaqs.com/firestick-black-screen-after-logo/), [Reddit observations](https://www.reddit.com/r/firetvstick/comments/q8gy1c/blankblack_screen_after_amazon_logo/). Anecdotes about ARC were not generalized. The draft prioritizes visible startup sequence, supported power and a direct HDMI comparison, not Wi-Fi or account resets. Resolution-shortcut source-version discrepancy is explicitly qualified.

### 12. How to organize IPTV channels

Search: `how to organize IPTV channels favorites groups Tivimate official playlists`.
Samples: [IPTVBros](https://iptvbros.com/blog/how-to-organize-iptv-channels/), [third-party multiple-playlist tutorial](https://tivimateiptvplayer.net/manage-multiple-playlists-in-tivimate/), [NviewX](https://nviewx.com/organize-iptv-channels/). Unverified exact menu paths and automatic merge/hide-duplicates claims were not adopted. Original workflow is task-based: hide bulk, curate favorites, preserve identities, test refresh persistence and distinguish hiding from access restriction.

### 13. What is XMLTV EPG

Search: `what is XMLTV EPG XMLTV DTD channel programme timestamp guide`.
Samples: [UniPlayer reference](https://uniplayer.net/docs/specs/xml/), [OTT Engine](https://www.ottengine.com/blog/epg-xmltv-setup-fast-channels), [third-party guide](https://tvimate4k.com/iptv-epg-guide/). Full DTD verified independently. Draft includes fictional XML, one-channel inspection exercise, structure-versus-accuracy distinction, identifiers, explicit offsets/UTC default, partial dates, coverage and security considerations. It is a conceptual guide, not a duplicate of topic 2's stale-guide repair sequence.

### 14. IPTV player vs IPTV service

Search: `IPTV player vs IPTV service official Tivimate Smarters no content`.
Samples included [IPTVNexus](https://iptvnexus.com/tivimate-vs-iptv-smarters/) and [IPTVSenpai](https://iptvsenpai.com/players/tivimate-vs-iptv-smarters-pro/). The draft adds five-role responsibility mapping, separate receipts, software installations versus media sessions, rights versus technical access, approved-client constraints and credential boundaries. It does not certify a provider or use “legal gray area” as purchasing reassurance.

### 15. TiviMate vs IPTV Smarters

Search: `Tivimate vs IPTV Smarters comparison official features supported devices`.
Samples: [MPTV](https://mptv.blog/articles/tivimate-vs-iptv-smarters-2026.html), [StoryIPTV](https://storyiptv.com/tivimate-vs-iptv-smarters-pro/), [4KIPTVSubs](https://4kiptvsubs.com/blog/tivimate-vs-smarters/). Extracts contain stale-looking fixed prices, conflicting recording/platform tables and unsupported numerical ratings. The draft avoids invented tests and scores, compares exact supported editions and tasks, adds a repeatable worksheet and minimal migration test, and qualifies Smarters features rather than inventing universal parity.

### 16. Firestick not connecting to Wi-Fi but other devices will

Search: `Firestick not connecting WiFi other devices work Amazon support network security`.
Samples: [Amazon community thread](https://uk.amazonforum.com/s/question/0D54P00007moAGNSA2/firestick-not-connected-to-network-was-working-before), [older community guidance](https://www.amazonforum.com/s/question/0D54P00007doTG8SAM/wifi-connection-issues-fire-tv-stick). Some old extracts recommend insecure or obsolete settings; those were rejected in favor of the current Amazon help page. Draft separates discovery, authentication, addressing and upstream access, checks cellular fallback, preserves secure configuration and interprets hotspot results cautiously.

### 17. Samsung TV apps not working but connected to internet

Search: `Samsung TV apps not working connected internet official Samsung Smart Hub Connection Test`.
Samples: [Technobezz shared-failure guide](https://www.technobezz.com/how-to-fix-samsung-tv-apps-not-working-when-connected-to-internet), [iTechGuides network guide](https://www.itechguides.com/how-to-connect-a-samsung-smart-tv-to-wi-fi-and-fix-setup-problems/). Draft centers on two independent playback controls, Network Status versus Smart Hub service tests, targeted reversible DNS comparisons and separate network/Hub/factory reset consequences. Topic 9 handles a single IPTV app instead.

### 18. Android TV storage space running out

Search: `Android TV storage space running out Google TV official free storage cache`.
Samples: [Android Police](https://www.androidpolice.com/i-recovered-5-gb-storage-on-google-tv-streamer-without-deleting-single-app/), [AndroidAyuda](https://en.androidayuda.com/android/general/Android-TV-Google-TV:-How-to-speed-up-your-TV--clean-cache--and-improve-performance-without-unusual-apps/), Google community reports. Rejected universal recovered-capacity promises and memory-cleaner framing. Google's official model caveat anchors the draft; it distinguishes storage/RAM, cache/data, unique files, adopted/removable storage and recurrence measurement.

### 19. Streaming buffering but internet is fine

Search: `streaming buffering internet fine Netflix help speed buffering packet loss`.
Samples: [SpeedtestHQ](https://www.speedtesthq.com/guides/streaming/netflix-buffering-fix), [DCSpeedTest](https://dcspeedtest.com/blog/netflix-buffering-fix-2026), [DMBio](https://dmbio.com/blog/how-do-i-fix-netflix-buffering-fast). Extracts included conflicting speed targets, unsupported precise loss thresholds and causal claims about evening congestion. Draft uses device/service/network comparisons, sustained versus peak transfer, loaded household use, mesh path caveats and decoding distinction. It does not duplicate topic 1's Fire TV-specific recovery.

### 20. How does IPTV work on Firestick

Search: `how does IPTV work Firestick official Fire TV Vega IPTV player no content`.
Samples: [IPTVSetupGuide](https://iptvsetupguide.com/iptv-firestick/), [RottenWiFi platform guide](https://rottenwifi.com/how-to-set-up-iptv-on-your-amazon-fire-stick-fire-os-and-vega-os-guide/), [DigiVoxTV](https://digivoxtv.com/firestick-iptv-setup-2026/). Draft explains the request chain, approved service apps versus neutral players, model/OS checks, HLS as one example rather than all IPTV, separate guide data and an explicitly hypothetical data calculation. It avoids a universal Downloader recipe, unsupported “every app” claims and enforcement bypasses.

## Editorial verification and limits

All new articles have independent introductions, conclusions and topic-specific sections, tables, common-mistakes sections, troubleshooting, best practices, eight visible FAQs, matching Article/FAQPage JSON-LD, contextual internal links and two original-image briefs. Image briefs are recommendations, not licensed screenshots or generated product photos. Local paragraph and 12-word-shingle checks cover all 20 drafts; they are not web-wide plagiarism certification. Human editorial judgment reviewed scope, clarity, conditional claims and destructive-step warnings; no external expert or hardware testing is claimed.

FAQPage is included because it was requested and represents visible content. It is not a promise of FAQ rich results: Google's 2026 documentation updates removed the FAQ rich-result feature documentation. No rankings, AI Overview placement, AI citation, or production search outcome is guaranteed. Final counts and runnable validation evidence are in `PROGRESS.md`, `content-audit.json`, and `browser-audit.json`.
