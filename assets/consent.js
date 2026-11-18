/* Banner de cookies do Mofo (LGPD) + Google Consent Mode v2.
   O padrão (anúncios negados até o aceite) é definido no <head>, antes do GTM.
   Escolha guardada em localStorage "mofo_consent" = "granted" | "denied". */
(function () {
  var KEY = 'mofo_consent';
  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); localStorage.setItem(KEY + '_em', new Date().toISOString()); } catch (e) {} }
  function gtag() { window.dataLayer = window.dataLayer || []; window.dataLayer.push(arguments); }
  function aplica(v) {
    var s = v === 'granted' ? 'granted' : 'denied';
    gtag('consent', 'update', { ad_storage: s, ad_user_data: s, ad_personalization: s });
    window.dataLayer.push({ event: 'mofo_consent_update', mofo_consent: v });
  }
  var css = '.mofo-cookies{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;max-width:420px;background:#FFFEEF;color:#42423C;border:1px solid #42423C;border-radius:25px;padding:20px 22px;font-family:inherit;font-size:14px;line-height:1.5;box-shadow:0 8px 30px rgba(66,66,60,.18)}' +
    '.mofo-cookies[hidden]{display:none}.mofo-cookies p{margin:0}.mofo-cookies strong{font-weight:700}.mofo-cookies a{color:inherit;text-decoration:underline;text-underline-offset:2px}' +
    '.mofo-cookies-btns{display:flex;gap:10px;margin-top:14px;flex-wrap:wrap}.mofo-cookies button{font:inherit;font-weight:600;font-size:13px;height:42px;padding:0 20px;border-radius:8px;cursor:pointer;transition:.15s}' +
    '.mofo-cookies .mc-sim{background:#FE7763;color:#fff;border:0}.mofo-cookies .mc-sim:hover{background:#42423C}' +
    '.mofo-cookies .mc-nao{background:transparent;color:#42423C;border:1.5px solid #42423C}.mofo-cookies .mc-nao:hover{background:#42423C;color:#fff}' +
    '@media (min-width:768px){.mofo-cookies{right:auto;left:24px;bottom:24px}}';
  function monta() {
    if (document.getElementById('mofoCookies')) return document.getElementById('mofoCookies');
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    var d = document.createElement('div');
    d.id = 'mofoCookies'; d.className = 'mofo-cookies'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-label', 'Preferências de cookies'); d.hidden = true;
    d.innerHTML = '<p><strong>Cookies?</strong> A gente usa pra medir o site e mostrar anúncios do Mofo pra quem já passou por aqui. Você decide. <a href="/politicas-de-privacidade/">Política de privacidade</a></p>' +
      '<div class="mofo-cookies-btns"><button type="button" class="mc-sim">aceitar</button><button type="button" class="mc-nao">só os necessários</button></div>';
    d.querySelector('.mc-sim').addEventListener('click', function () { set('granted'); aplica('granted'); d.hidden = true; });
    d.querySelector('.mc-nao').addEventListener('click', function () { set('denied'); aplica('denied'); d.hidden = true; });
    document.body.appendChild(d);
    return d;
  }
  window.mofoCookies = { abrir: function () { monta().hidden = false; } };
  function inicia() {
    document.querySelectorAll('[data-abre-cookies]').forEach(function (b) { b.addEventListener('click', function (e) { e.preventDefault(); window.mofoCookies.abrir(); }); });
    if (!get()) monta().hidden = false;
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', inicia); else inicia();
})();
