import m from "mithril";
import CookieStore from "@/module/cookiestore";

const View = (): m.Component => {
  const logout = () => {
    CookieStore.clear();
    m.route.set("/");
  };

  // FIXME: change a to m.route.Link.
  //                   {m(m.route.Link, { href: "" })}

  return {
    view: () => (
      <main>
        <nav
          class="navbar is-black"
          role="navigation"
          aria-label="main navigation"
        >
          <div class="navbar-brand">
            <a class="navbar-item" href="/" data-cy="home-link">
              <strong>gomithrilapp</strong>
            </a>

            <a
              id="mobile-navbar-top"
              role="button"
              class="navbar-burger burger"
              aria-label="menu"
              aria-expanded="false"
              data-target="navbar-top"
              onclick={() => {
                const mob = document.getElementById("mobile-navbar-top");
                const nav = document.getElementById("navbar-top");
                mob.classList.toggle("is-active");
                nav.classList.toggle("is-active");
              }}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div id="navbar-top" class="navbar-menu">
            <div class="navbar-end">
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Menu</a>

                <div class="navbar-dropdown is-right">
                  {!CookieStore.isLoggedIn() && (
                    <a class="navbar-item" href="/login">
                      Login
                    </a>
                  )}

                  <a
                    class="navbar-item"
                    href={`https://petstore.swagger.io/?url=${location.origin}/static/swagger.json`}
                  >
                    Swagger
                  </a>
                  <a class="navbar-item" href="/about">
                    About
                  </a>
                  <hr class="navbar-divider" />
                  {CookieStore.isLoggedIn() && (
                    <a
                      class="dropdown-item"
                      onclick={() => {
                        logout();
                      }}
                    >
                      Logout
                    </a>
                  )}
                  <div class="navbar-item">v1.0.0</div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </main>
    ),
  };
};

export default View;
