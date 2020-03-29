var m = require('mithril')

var data = {
  title: 'Register',
  subtitle: 'Enter your information below.'
}

module.exports = {
  view: () =>
<main>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title">{ data.title }</h1>
        <h2 class="subtitle">{ data.subtitle }</h2>
      </div>

      <div class="container" style="margin-top: 1em;">
          <form name="login">

            <div class="field">
              <label class="label">First Name</label>
              <div class="control">
                <input label="first_name" name="first_name" type="text" class="input" data-cy="first_name" required></input>
              </div>
            </div>

            <div class="field">
              <label class="label">Last Name</label>
              <div class="control">
                <input label="last_name" name="last_name" type="text" class="input" data-cy="last_name" required></input>
              </div>
            </div>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input label="Email" name="email" type="text" class="input" data-cy="email" required></input>
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input label="Password" name="password" type="password" class="input" data-cy="password" required></input>
              </div>
            </div>

            <div class="field is-grouped">
              <p class="control">
                <button id="submit" type="submit" data-cy="submit" class="button is-primary">
                  Create Account
                </button>
              </p>

              <p class="control">
                <button type="button" class="button is-light">
                  Clear
                </button>
              </p>
            </div>
          </form>
      </div>
    </section>
  </div>
</main>
}