declare module "next/config" {
	const _default: () => {
		publicRuntimeConfig: NodeJS.ProcessEnv["APP_ENV"];
	};
	export default _default;
}
