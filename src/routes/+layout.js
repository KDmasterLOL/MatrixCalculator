export const prerender = true;
// @ts-ignore
export const load = ({ url }) => {
  const { pathname } = url;
  return { pathname }
}
