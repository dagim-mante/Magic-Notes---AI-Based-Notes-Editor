import "next-auth";

declare module "next-auth" {
	interface User {
		id?: string | null;
    	name?: string | null;
    	email?: string | null;
    	image?: string | null;
	}

	interface Session {
		user?: User;
	}
}

declare module "@auth/core/jwt" {
	interface JWT {
		user?: User;
	}
}