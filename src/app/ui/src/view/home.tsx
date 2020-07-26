import m from "mithril";

const data = {
  title: "Welcome",
  subtitle: "Login was successful",
};

// FIXME: Turn a into m.route.Link

const Page: m.Component = {
  view: () => (
    <div>
      <section class="hero is-primary">
        <div class="hero-body">
          <div class="container">
            <h1 class="title">{data.title}</h1>
            <h2 class="subtitle">{data.subtitle}</h2>
          </div>
        </div>
      </section>
      <br />
      <div class="container">
        <a href="/notepad" data-cy="notepad-link">
          Click here to access your Notepad.
        </a>
      </div>
    </div>
  ),
};

export default Page;
