var m = require('mithril')

var data = {
  title: 'About'
}

module.exports = {
  view: () =>
<main>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">
          { data.title }
        </h1>
        <h2 class="subtitle">
          This shows you how to build a website using <strong>Mithril</strong> and <strong>Bulma</strong>.
        </h2>
      </div>
    </section>
  </div>
</main>
}