class AuthService {
  constructor() {
    this.supabase = null;
  }

  async Login({ supabase, email, password }) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          this.supabase = supabase;
          const data = await this.supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (data.error) {
            reject(data.error);
          }

          resolve(data);
        }, 1000);
      });
    } catch (error) {
      return setTimeout(() => {
        throw new Error(error?.message || error);
      }, 1000);
    }
  }

  async Logout(supabase) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          this.supabase = supabase;
          const data = await this.supabase.auth.signOut();

          if (data.error) {
            reject(data.error);
          }

          resolve(data);
        }, 1000);
      });
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }

  async AddUser({ supabase, email, password }) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          this.supabase = supabase;
          const data = await this.supabase.auth.signUp({
            email,
            password,
            redirectTo: `${
              window?.location?.origin || 'https://warranty-zaxe.vercel.app'
            }/resetpassword`,
          });

          if (data.error) {
            reject(data.error);
          }

          resolve(data);
        }, 1000);
      });
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }

  async ResetPWD({ supabase, email, password }) {
    try {
      return new Promise((resolve, reject) => {
        setTimeout(async () => {
          this.supabase = supabase;
          const data = await this.supabase.auth.updateUser({ email, password });

          if (data.error) {
            reject(data.error);
          }

          resolve(data);
        }, 1000);
      });
    } catch (error) {
      throw new Error(error?.message || error);
    }
  }
}

export default new AuthService();
