import Link from "next/link";
import { withRouter } from "next/router";
import { Children } from "react";

// https://gist.github.com/remy/0dde38897d6d660f0b63867c2344fb59
const ActiveLink = withRouter(({ router, children, ...props }) => (
  <Link {...props}>
    {React.cloneElement(Children.only(children), {
      isSelected: router.pathname === props.href
    })}
  </Link>
));
export default ActiveLink;
