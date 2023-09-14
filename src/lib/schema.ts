export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

// this file represents a basic schema that doesn't do a whole lot other than working out the
// publicly available talbes and their datatype representations.  Prisma can be added
// to extend this schema functionality in a way that doesn't, you know, suck.

export interface Database {
	public: {
		Tables: {
			profiles: {
				Row: {
					id: string;
					updated_at: string | null;
					username: string | null;
					avatar_url: string | null;
					website: string | null;
				};
				Insert: {
					id: string;
					updated_at?: string | null;
					username?: string | null;
					avatar_url?: string | null;
					website?: string | null;
				};
				Update: {
					id?: string;
					updated_at?: string | null;
					username?: string | null;
					avatar_url?: string | null;
					website?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
	};
}
