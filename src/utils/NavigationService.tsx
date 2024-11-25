import {CommonActions, StackActions} from '@react-navigation/native';

let _navigator: any;
type NavigatorType = {
  dispatch: (action: any) => void;
};
export let globalNavRef: any;
/**
 *
 * @param {*} navigatorRef
 * set the navigator ref to local ref from NavigationRoot file
 */
function setTopLevelNavigator(navigatorRef: any) {
  _navigator = navigatorRef;
  globalNavRef = navigatorRef;
}

/**
 *
 * @returns the navigator
 */
function getGlobalNavigator() {
  return globalNavRef;
}

/**
 *
 * @param {*} routeName
 * @param {*} params
 * provide navigation to given routename
 */
function navigatewithparam(routeName: string, param?: any) {
  _navigator.navigate(routeName, param);
}

/**
 *
 * @returns navigation state
 */
function getState() {
  return _navigator.getState();
}
function navigate(routeName: string, param?: any) {
  return _navigator.navigate(routeName, param);
}

/**
 *
 * @param {*} navigationState
 * @returns get current route name
 */
function getCurrentRoute(navigationState: {
  routes: {[x: string]: any};
  index: string | number;
}) {
  const route = navigationState
    ? navigationState.routes[navigationState.index]
    : undefined;
  // dive into nested navigators
  if (route) {
    if (route.routes) {
      return getCurrentRoute(route);
    }
  }
  return route;
}

/**
 *
 * @param {*} params
 * sets the custom params to route navigation
 */
function setParams(params: any, name: any) {
  const currentRoute = getCurrentRoute(getState());
  let {key} = currentRoute;
  _navigator.dispatch(
    CommonActions.setParams({
      key,
      params,
    }),
  );
}

/** goback method */
// function goBack() {
//    _navigator.dispatch(
//       CommonActions.back({})
//    );
// };
// add other navigation functions that you need and export them

/**
 * navigation popToTop method
 */
function popToTop() {
  _navigator.dispatch(StackActions.popToTop());
}

/** stack reset action method */
function resetAction(routeName: any, params?: any, index = 0) {
  _navigator.dispatch(
    CommonActions.reset({
      routes: [{name: routeName, params}],
    }),
  );
}

/**
 *
 * @param {*} mainTabRouteName
 * @param {*} nextScreenName
 * @param {*} params
 * stack reset handling
 */
function stackReset(
  mainTabRouteName: string,
  nextScreenName: string,
  params?: object,
) {
  const resetAction: any = CommonActions.reset({
    index: 0,
    routes: [{name: mainTabRouteName}],
  });

  _navigator.dispatch(resetAction);

  const screenActions: any = CommonActions.navigate({
    name: nextScreenName,
    params: params,
  });

  _navigator.dispatch(screenActions);
}

/**
 * Navigation Service Facility for provide different Kind of routing
 */
export default {
  //  goBack,
  getState,
  setParams,
  popToTop,
  resetAction,
  getCurrentRoute,
  setTopLevelNavigator,
  stackReset,
  getGlobalNavigator,
  navigatewithparam,
  navigate,
};
