export const slugAliasMap: Record<string, string> = {
  animais: "desenhos-animais",
};

export const getRouteSlug = (term: string) => slugAliasMap[term] || term;
export const getRouteHref = (term: string) => `/${getRouteSlug(term)}/`;
