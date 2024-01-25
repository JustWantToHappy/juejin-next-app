declare module "next/config" {
	declare const _default: () => {
		publicRuntimeConfig: NodeJS.ProcessEnv["APP_ENV"];
	};
	export default _default;
}
