globalThis.__nitro_main__ = import.meta.url;
import "./_libs/unenv.mjs";

import { H as HookableCore } from "./_libs/hookable.mjs";
import { d as defineLazyEventHandler, H as HTTPError, a as H3Core } from "./_libs/h3.mjs";
import { a as FastResponse } from "./_libs/srvx.mjs";


import "./_libs/rou3.mjs";





function lazyService(loader) {
  let promise, mod;
  return {
    fetch(req) {
      if (mod) {
        return mod.fetch(req);
      }
      if (!promise) {
        promise = loader().then((_mod) => mod = _mod.default || _mod);
      }
      return promise.then((mod2) => mod2.fetch(req));
    }
  };
}
const services = {
  ["ssr"]: lazyService(() => import("./_ssr/index.mjs"))
};
globalThis.__nitro_vite_envs__ = services;
const assets = {
  "/assets/arrow-left-COiAd-O9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a6-E4oAT9ewjcIg227ZXar/rNjQoIo"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 166,
    "path": "../public/assets/arrow-left-COiAd-O9.js"
  },
  "/assets/auth-middleware-CGq8tR1o.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"123c-6xDnI8Ex/fZw9yFOzm8W2PqCyks"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 4668,
    "path": "../public/assets/auth-middleware-CGq8tR1o.js"
  },
  "/assets/AttachmentPreviewDialog-BGuMYfrp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b3a-Q8T/YxczGBLWoiXhWpUmmr8Tq0w"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 2874,
    "path": "../public/assets/AttachmentPreviewDialog-BGuMYfrp.js"
  },
  "/assets/avatar-DgHmBEv7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"98c-2CuwXB0AfojvYgCnzu/Nu1rp3Qw"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 2444,
    "path": "../public/assets/avatar-DgHmBEv7.js"
  },
  "/assets/badge-b9XpZN69.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2d3-a+vGskeH5JEO+Nvrq/+SONxE1PQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 723,
    "path": "../public/assets/badge-b9XpZN69.js"
  },
  "/assets/calendario-C8MQHumN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"88-QC/eC+jqkpfre9JoY68uUpPpnqk"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 136,
    "path": "../public/assets/calendario-C8MQHumN.js"
  },
  "/assets/auth-CCI3CrJj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1ee25-KVPrPMtvth/COLrXF9r9m2eHT8c"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 126501,
    "path": "../public/assets/auth-CCI3CrJj.js"
  },
  "/assets/check-DTjDXNia.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"78-cH49TBXtVpbX2KvQlNiOkg3ykNQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 120,
    "path": "../public/assets/check-DTjDXNia.js"
  },
  "/assets/calendar-B-0mhDVt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"102-T5wyMtcMcqE0+jwbTAi9CjwjJ94"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 258,
    "path": "../public/assets/calendar-B-0mhDVt.js"
  },
  "/assets/chevron-right-DESmOTT6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"83-V3dV0PYIPvExGGPC1KTEdHC7MBA"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 131,
    "path": "../public/assets/chevron-right-DESmOTT6.js"
  },
  "/assets/checkbox-BJ-ob8z-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10f9-yERrJtE/6rU84QNHvBS4niNSrMw"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 4345,
    "path": "../public/assets/checkbox-BJ-ob8z-.js"
  },
  "/assets/chevron-down-C7OxQT5v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"81-lgQY5ka+t7FLJ8iQKAoi8WQ5NHk"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 129,
    "path": "../public/assets/chevron-down-C7OxQT5v.js"
  },
  "/assets/circle-check-Bdr3lt74.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ae-6UEjYUgJSaXAZ3Dey8Rcyw2ywKQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 174,
    "path": "../public/assets/circle-check-Bdr3lt74.js"
  },
  "/assets/client-report._clientId-CyGcwTpS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"f4c-2jtL0002YPo2LE/ZjnELAk4eONk"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 3916,
    "path": "../public/assets/client-report._clientId-CyGcwTpS.js"
  },
  "/assets/clients-DrbRAg0T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16b4-+0np+QWksxlUVvLwtiPMoyPUNhY"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 5812,
    "path": "../public/assets/clients-DrbRAg0T.js"
  },
  "/assets/clients.index-z8AgVvKf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4a-1LInmk1MIxssF+aSxPLz/dGlANs"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 74,
    "path": "../public/assets/clients.index-z8AgVvKf.js"
  },
  "/assets/clients.new-Bbk_QBST.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1729-iFzp5Pu84s9h2qIiFcdazdBPygU"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 5929,
    "path": "../public/assets/clients.new-Bbk_QBST.js"
  },
  "/assets/clients._clientId.edit-ZK_oG0be.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5c15-duU9Vk+I5DgEVyfI2M4H/a7Tj1c"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 23573,
    "path": "../public/assets/clients._clientId.edit-ZK_oG0be.js"
  },
  "/assets/copy-COTctRZk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e8-JsFjwCi0IN5hvxHxOdoctAoS6PQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 232,
    "path": "../public/assets/copy-COTctRZk.js"
  },
  "/assets/collapsible-CJ3K7eAQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a15-DoHWuzKVbJa/dXBUWgGeVaDO4Ws"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 2581,
    "path": "../public/assets/collapsible-CJ3K7eAQ.js"
  },
  "/assets/endOfWeek-c_Px3aNS.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"22d-JPvnuCotXsq201R5+xUc9cASTkY"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 557,
    "path": "../public/assets/endOfWeek-c_Px3aNS.js"
  },
  "/assets/dashboard-DAOe748h.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1844-QaP4XerGYmQl89RGRc4DhaB6ygU"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 6212,
    "path": "../public/assets/dashboard-DAOe748h.js"
  },
  "/assets/file-down-DuX5xAi0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"24b-548vAhPr3jlABpiV38g2cqMAug4"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 587,
    "path": "../public/assets/file-down-DuX5xAi0.js"
  },
  "/assets/format-BCDoeJMh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4b53-+BqEWrVRw7BrZIGUA/lhjts9cJI"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 19283,
    "path": "../public/assets/format-BCDoeJMh.js"
  },
  "/assets/file-text-D0la4Vmn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"182-fxnPS8YwQUBFZG8V3U0PAYkifFQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 386,
    "path": "../public/assets/file-text-D0la4Vmn.js"
  },
  "/assets/image-up-CN7p-hq6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"152-siioUaZ5RZdiXwtNRnXLrFuov5I"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 338,
    "path": "../public/assets/image-up-CN7p-hq6.js"
  },
  "/assets/import-ata-CFpQRD4M.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2ef6-XuazV3cU+B3PPVGaHCZNPo6H3vg"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 12022,
    "path": "../public/assets/import-ata-CFpQRD4M.js"
  },
  "/assets/index-BUGWrC5L.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1dda-jZh1ryc30LpCtCQMZ7sDQpPR9YY"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 7642,
    "path": "../public/assets/index-BUGWrC5L.js"
  },
  "/assets/index-DGqsIE1X.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"127-PHN495b1modvRigESGYuLSViWVA"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 295,
    "path": "../public/assets/index-DGqsIE1X.js"
  },
  "/assets/index-pCWekPS6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"4f0-sbXgcFzwDhaKQbRWwholFFZm8ec"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 1264,
    "path": "../public/assets/index-pCWekPS6.js"
  },
  "/assets/html2canvas.esm-DXEQVQnt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"31151-TyUyRNm9rR2JDwpyAxcruTmmr6A"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 201041,
    "path": "../public/assets/html2canvas.esm-DXEQVQnt.js"
  },
  "/assets/isBefore-j9Hc1XWW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"55-uXqfSGXD6BtSbu3buLzjUV4Etws"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 85,
    "path": "../public/assets/isBefore-j9Hc1XWW.js"
  },
  "/assets/index.es-B59l1_Ub.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"26c6f-w9QY1HwSxjaGZx4Gn1c434/j9/k"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 158831,
    "path": "../public/assets/index.es-B59l1_Ub.js"
  },
  "/assets/list-Bu4Aezyn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"12f-GUeHMA05zZc8/YulGtB04CgR1s4"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 303,
    "path": "../public/assets/list-Bu4Aezyn.js"
  },
  "/assets/list-checks-Rf64tsW2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"113-eO3GxFTqlvK3vLjBC7Wg8AlvP9k"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 275,
    "path": "../public/assets/list-checks-Rf64tsW2.js"
  },
  "/assets/notebook-pen-Dki5tf50.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1dd-7sG/fd8r6IylWVSCs08LIl4IGss"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 477,
    "path": "../public/assets/notebook-pen-Dki5tf50.js"
  },
  "/assets/loader-circle-DTMXAil4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"8c-hx+1KoXXeKZbNZB0ZT8ZC1hKuc0"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 140,
    "path": "../public/assets/loader-circle-DTMXAil4.js"
  },
  "/assets/panels-top-left-2QfVei9c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e5-CpTx8XTmtNemlfEMY6m3fb96T2c"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 229,
    "path": "../public/assets/panels-top-left-2QfVei9c.js"
  },
  "/assets/parseISO-CZFeO8z-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"a65-NoLhJG3aUNQ4BApB8/Hnimktduw"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 2661,
    "path": "../public/assets/parseISO-CZFeO8z-.js"
  },
  "/assets/notes-BEpbG1eL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"10d40-mBs2PPwCnnzKzb3FU2Ap4LiBHhg"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 68928,
    "path": "../public/assets/notes-BEpbG1eL.js"
  },
  "/assets/paperclip-C_8SvxxY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e5-D3Zbd17FHez5xSoxCfRLHHdgt9M"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 229,
    "path": "../public/assets/paperclip-C_8SvxxY.js"
  },
  "/assets/portal.financeiro-B5CwEz5S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3afd-kwe40f6j0DlkTRIEdQbXsOQTsmo"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 15101,
    "path": "../public/assets/portal.financeiro-B5CwEz5S.js"
  },
  "/assets/portal.entregas-aKqhd0V5.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"132b-p1SB7PGZwE0GxVXxeHK4UoqG8aQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 4907,
    "path": "../public/assets/portal.entregas-aKqhd0V5.js"
  },
  "/assets/pt-BR-1gqLVZyF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"16f0-ZHvI31JSTGpdyTkylmlrhFtMqgQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 5872,
    "path": "../public/assets/pt-BR-1gqLVZyF.js"
  },
  "/assets/purify.es-VaSPOPhr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7032-uZQ20bhcE4YqMv2bJ83N97r01ek"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 28722,
    "path": "../public/assets/purify.es-VaSPOPhr.js"
  },
  "/assets/jspdf.es.min-CVBFb8m9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5e485-RgBFxKWHL5pXiAuEVg6uuOV/iF8"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 386181,
    "path": "../public/assets/jspdf.es.min-CVBFb8m9.js"
  },
  "/assets/reports-BwOYnBwB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"2e52-An4vKwPb0S/U89mOnSlByI9Zx54"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 11858,
    "path": "../public/assets/reports-BwOYnBwB.js"
  },
  "/assets/PieChart-D3RPOS1a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"62eed-NMckQ7Dgwl0s3hhmY2U9aX0D5ek"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 405229,
    "path": "../public/assets/PieChart-D3RPOS1a.js"
  },
  "/assets/RichTextEditor-CyEgnkch.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5f938-DeHAotTfNPTTkfBX+SUJooTsQfA"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 391480,
    "path": "../public/assets/RichTextEditor-CyEgnkch.js"
  },
  "/assets/index-Bs6B4VV9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"b2681-rNqJhTxctR1zfELcX62tye9UBac"',
    "mtime": "2026-07-27T12:47:41.634Z",
    "size": 730753,
    "path": "../public/assets/index-Bs6B4VV9.js"
  },
  "/assets/rotate-ccw-D5iQLrT0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c9-LYuQq0/VIlOoEmT3pxWwltdQGYg"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 201,
    "path": "../public/assets/rotate-ccw-D5iQLrT0.js"
  },
  "/assets/save-DxlOjZPW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"148-Zn/hSewTZMzl+fk0qwo8hsc7Lh8"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 328,
    "path": "../public/assets/save-DxlOjZPW.js"
  },
  "/assets/select-Cxf8lzmb.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"564d-3h++2VwMBxqjDYwac/yvv8t2E8E"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 22093,
    "path": "../public/assets/select-Cxf8lzmb.js"
  },
  "/assets/shield-check-QMChOYi2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"13c-wz9ylpqS1s1hbWhukmun/1Pk/M4"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 316,
    "path": "../public/assets/shield-check-QMChOYi2.js"
  },
  "/assets/settings-CI3rVA1_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e40-lpQ4TuWdbKECZmoKZV7t37vDDaA"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 3648,
    "path": "../public/assets/settings-CI3rVA1_.js"
  },
  "/assets/sortable.esm-CgQbzOhP.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"bf45-q5IDBISybhoMdh/B5jsufWZN1yE"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 48965,
    "path": "../public/assets/sortable.esm-CgQbzOhP.js"
  },
  "/assets/startOfWeek-hGRcIbtw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"147-ujqSgFC1WC1N4turdhNwqJFWmHE"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 327,
    "path": "../public/assets/startOfWeek-hGRcIbtw.js"
  },
  "/assets/startOfDay-Dcc5Sdzq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"17e-JtU/Mahc1XNc4HjVpIXkcJc/KJQ"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 382,
    "path": "../public/assets/startOfDay-Dcc5Sdzq.js"
  },
  "/assets/tabs-DVb-oTe6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e4e-5aG7f5OIw5/C978a4a/2YAM0jrY"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 7758,
    "path": "../public/assets/tabs-DVb-oTe6.js"
  },
  "/assets/subMonths-BLQlMsac.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"397-6coHbRxzbN6E8UskQcNfyAq/CkU"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 919,
    "path": "../public/assets/subMonths-BLQlMsac.js"
  },
  "/assets/styles-R0XJZbBL.css": {
    "type": "text/css; charset=utf-8",
    "etag": '"1bfcc-RkfMl+9MfRwOlabUCTJYtAjm+88"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 114636,
    "path": "../public/assets/styles-R0XJZbBL.css"
  },
  "/assets/TaskDialog-CXJ70z8S.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"867b-UvYL8cO16mhgZoiDsq7dy6BhqDw"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 34427,
    "path": "../public/assets/TaskDialog-CXJ70z8S.js"
  },
  "/assets/tasks-C5s5nltk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"526-cVgS45iWN58nx1JsBAHf/LDXBoo"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 1318,
    "path": "../public/assets/tasks-C5s5nltk.js"
  },
  "/assets/tasks.calendar-CshxA10t.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"111b-06smETuFeeip6dbtktLKMgNf/ZM"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 4379,
    "path": "../public/assets/tasks.calendar-CshxA10t.js"
  },
  "/assets/tasks.index-BRwJDqwk.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"7c-XlWQXGqaNHZt02CVXkRM+OirvNs"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 124,
    "path": "../public/assets/tasks.index-BRwJDqwk.js"
  },
  "/assets/tasks.list-sJ_RbJhL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"193f-gaLxnrCJh/xr5pMF53WgtpEnRHU"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 6463,
    "path": "../public/assets/tasks.list-sJ_RbJhL.js"
  },
  "/assets/trash-3Punkxds.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"d8c-Ejpb4/CRIskR6lmqD7xZwJxiX3E"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 3468,
    "path": "../public/assets/trash-3Punkxds.js"
  },
  "/assets/underline-0i2yRZ0v.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"3ba-5vPnNGIxSDHTHkOjp9dKYjkltmI"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 954,
    "path": "../public/assets/underline-0i2yRZ0v.js"
  },
  "/assets/upload-CY96Dtek.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"e7-75bHrNOjD8kefXD0PBlFbzOS8f8"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 231,
    "path": "../public/assets/upload-CY96Dtek.js"
  },
  "/assets/useMutation-V3x5ZMW4.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"89d-ZNQVrXxeBXjFOOb9HRFAG2+6r9Y"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 2205,
    "path": "../public/assets/useMutation-V3x5ZMW4.js"
  },
  "/assets/user-check-DIEElKsQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"ef-C8tWtS+5pzVcykJkriLYTmCaUn0"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 239,
    "path": "../public/assets/user-check-DIEElKsQ.js"
  },
  "/assets/tasks.kanban-BOlOSCrY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"1e313-6af9HsPMl5YWTXYvunQZD58I0hU"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 123667,
    "path": "../public/assets/tasks.kanban-BOlOSCrY.js"
  },
  "/assets/user-CpzUfMxs.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"c0-HjZTbRG8bKp6Bn0c7OtNnLsum58"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 192,
    "path": "../public/assets/user-CpzUfMxs.js"
  },
  "/assets/useRouterState-DsTqGHCO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"aa-NF1in1MeHaHVz3o711sGfC9yS+U"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 170,
    "path": "../public/assets/useRouterState-DsTqGHCO.js"
  },
  "/assets/taskflow-logo-CclP8rxi.png": {
    "type": "image/png",
    "etag": '"aa41b-fF6kkI+/962i+Pc7W1ba5L8XKh8"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 697371,
    "path": "../public/assets/taskflow-logo-CclP8rxi.png"
  },
  "/assets/users-COTPgxng.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"23c9-DCCM7TL35QXh1DNZiianUrMBeyI"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 9161,
    "path": "../public/assets/users-COTPgxng.js"
  },
  "/assets/zap-l9AtPS2s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"107-v3bCIRBGwbb4bAR1x921qRgAybU"',
    "mtime": "2026-07-27T12:47:41.633Z",
    "size": 263,
    "path": "../public/assets/zap-l9AtPS2s.js"
  },
  "/assets/_app-BkfAGNr7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": '"5ae1-CXP3c8lle6JgcwT5I3lfYYWrU2E"',
    "mtime": "2026-07-27T12:47:41.632Z",
    "size": 23265,
    "path": "../public/assets/_app-BkfAGNr7.js"
  }
};
const publicAssetBases = {};
function isPublicAssetURL(id = "") {
  if (assets[id]) {
    return true;
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) {
      return true;
    }
  }
  return false;
}
const headers = ((m) => function headersRouteRule(event) {
  for (const [key, value] of Object.entries(m.options || {})) {
    event.res.headers.set(key, value);
  }
});
const findRouteRules = /* @__PURE__ */ (() => {
  const $0 = [{ name: "headers", route: "/assets/**", handler: headers, options: { "cache-control": "public, max-age=31536000, immutable" } }];
  return (m, p) => {
    let r = [];
    if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
    let s = p.split("/"), l = s.length;
    if (l > 1) {
      if (s[1] === "assets") {
        r.unshift({ data: $0, params: { "_": s.slice(2).join("/") } });
      }
    }
    return r;
  };
})();
const _lazy_GtBnbA = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
const findRoute = /* @__PURE__ */ (() => {
  const data = { route: "/**", handler: _lazy_GtBnbA };
  return ((_m, p) => {
    return { data, params: { "_": p.slice(1) } };
  });
})();
const errorHandler$1 = (error, event) => {
  const res = defaultHandler(error, event);
  return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
  const unhandled = error.unhandled ?? !HTTPError.isError(error);
  const { status = 500, statusText = "" } = unhandled ? {} : error;
  if (status === 404) {
    const url = event.url || new URL(event.req.url);
    const baseURL = "/";
    if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) {
      return {
        status: 302,
        headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
      };
    }
  }
  const headers2 = new Headers(unhandled ? {} : error.headers);
  headers2.set("content-type", "application/json; charset=utf-8");
  const jsonBody = unhandled ? {
    status,
    unhandled: true
  } : typeof error.toJSON === "function" ? error.toJSON() : {
    status,
    statusText,
    message: error.message
  };
  return {
    status,
    statusText,
    headers: headers2,
    body: {
      error: true,
      ...jsonBody
    }
  };
}
const errorHandlers = [errorHandler$1];
async function errorHandler(error, event) {
  for (const handler of errorHandlers) {
    try {
      const response = await handler(error, event, { defaultHandler });
      if (response) {
        return response;
      }
    } catch (error2) {
      console.error(error2);
    }
  }
}
function createNitroApp() {
  const captureError = (error, errorCtx) => {
    if (errorCtx?.event) {
      const errors = errorCtx.event.req.context?.nitro?.errors;
      if (errors) {
        errors.push({ error, context: errorCtx });
      }
    }
  };
  const h3App = createH3App({
    onError(error, event) {
      return errorHandler(error, event);
    }
  });
  let appHandler = (req) => {
    req.context ||= {};
    req.context.nitro = req.context.nitro || { errors: [] };
    return h3App.fetch(req);
  };
  return {
    fetch: appHandler,
    h3: h3App,
    hooks: void 0,
    captureError
  };
}
function createH3App(config) {
  const h3App = new H3Core(config);
  h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
  h3App["~getMiddleware"] = (event, route) => {
    const pathname = event.url.pathname;
    const method = event.req.method;
    const middleware = [];
    const routeRules = getRouteRules(method, pathname);
    event.context.routeRules = routeRules?.routeRules;
    if (routeRules?.routeRuleMiddleware.length) {
      middleware.push(...routeRules.routeRuleMiddleware);
    }
    if (route?.data?.middleware?.length) {
      middleware.push(...route.data.middleware);
    }
    return middleware;
  };
  return h3App;
}
const APP_ID = "default";
function useNitroApp() {
  let instance = useNitroApp._instance;
  if (instance) {
    return instance;
  }
  instance = useNitroApp._instance = createNitroApp();
  globalThis.__nitro__ = globalThis.__nitro__ || {};
  globalThis.__nitro__[APP_ID] = instance;
  return instance;
}
function useNitroHooks() {
  const nitroApp = useNitroApp();
  const hooks = nitroApp.hooks;
  if (hooks) {
    return hooks;
  }
  return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
  const m = findRouteRules(method, pathname);
  if (!m?.length) {
    return { routeRuleMiddleware: [] };
  }
  const routeRules = {};
  for (const layer of m) {
    for (const rule of layer.data) {
      const currentRule = routeRules[rule.name];
      if (currentRule) {
        if (rule.options === false) {
          delete routeRules[rule.name];
          continue;
        }
        if (typeof currentRule.options === "object" && typeof rule.options === "object") {
          currentRule.options = {
            ...currentRule.options,
            ...rule.options
          };
        } else {
          currentRule.options = rule.options;
        }
        currentRule.route = rule.route;
        currentRule.params = {
          ...currentRule.params,
          ...layer.params
        };
      } else if (rule.options !== false) {
        routeRules[rule.name] = {
          ...rule,
          params: layer.params
        };
      }
    }
  }
  const middleware = [];
  const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
  for (const rule of orderedRules) {
    if (rule.options === false || !rule.handler) {
      continue;
    }
    middleware.push(rule.handler(rule));
  }
  return {
    routeRules,
    routeRuleMiddleware: middleware
  };
}
function createHandler(hooks) {
  const nitroApp = useNitroApp();
  const nitroHooks = useNitroHooks();
  return {
    async fetch(request, env, context) {
      globalThis.__env__ = env;
      augmentReq(request, {
        env,
        context
      });
      const ctxExt = {};
      const url = new URL(request.url);
      if (hooks.fetch) {
        const res = await hooks.fetch(request, env, context, url, ctxExt);
        if (res) {
          return res;
        }
      }
      return await nitroApp.fetch(request);
    },
    scheduled(controller, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
        controller,
        env,
        context
      }) || Promise.resolve());
    },
    email(message, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:email", {
        message,
        event: message,
        env,
        context
      }) || Promise.resolve());
    },
    queue(batch, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
        batch,
        event: batch,
        env,
        context
      }) || Promise.resolve());
    },
    tail(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
        traces,
        env,
        context
      }) || Promise.resolve());
    },
    trace(traces, env, context) {
      globalThis.__env__ = env;
      context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
        traces,
        env,
        context
      }) || Promise.resolve());
    }
  };
}
function augmentReq(cfReq, ctx) {
  const req = cfReq;
  req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
  req.runtime ??= { name: "cloudflare" };
  req.runtime.cloudflare = {
    ...req.runtime.cloudflare,
    ...ctx
  };
  req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
const cloudflareModule = createHandler({ fetch(cfRequest, env, context, url) {
  if (env.ASSETS && isPublicAssetURL(url.pathname)) {
    return env.ASSETS.fetch(cfRequest);
  }
} });
export {
  cloudflareModule as default
};
