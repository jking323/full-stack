import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { TripDataService } from '../services/trip-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripDataService
  ) {}

  public getToken(): string {
    return this.storage.getItem('travlr-token') as string;
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public async login(user: User): Promise<AuthResponse> {
    const authResp = await this.tripDataService.login(user);
    this.saveToken(authResp.token);
    return authResp;
  }

  public async register(user: User): Promise<AuthResponse> {
    const authResp = await this.tripDataService.register(user);
    this.saveToken(authResp.token);
    return authResp;
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getCurrentUser(): User | undefined {
    if (this.isLoggedIn()) {
      const token: string | null = this.getToken();
      if (token) {
        const { email, name } = JSON.parse(atob(token.split('.')[1]));
        return { email, name } as User;
      }
    }
    return undefined;
  }
}

