import * as React from 'react';

/*
  Page404 Helpers
*/
interface Page404Props {}

/*
  Page404 Colors // TODO : move theme.json
*/

/*
  Page404 Strings
*/
const Page404Strings = {
  pageNotFount: 'Sayfa bulunamadi',
};

/*
  Page404 Styles
*/

function Page404(props: React.PropsWithChildren<Page404Props>) {
  const __ = <p>{Page404Strings.pageNotFount}</p>;

  /*
  Page404 Lifecycle
  */

  /*
  Page404 Functions
  */

  return __;
}

const _Page404 = Page404;

export { _Page404 as Page404 };
