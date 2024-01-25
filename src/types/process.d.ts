declare namespace NodeJS {
	export interface ProcessEnv {
		APP_ENV: "development" | "production" | "test";
		API_URL: string;
		GITHUB_ID: string;
		GITHUB_SECRET: string;
		NEXTAUTH_SECRET: string;
		NEXTAUTH_URL: string;
		SECRET: string;
	}
}
