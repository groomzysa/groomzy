export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  File: any;
};

export type Address = {
  __typename?: 'Address';
  areaCode?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  province?: Maybe<Scalars['String']>;
  streetName?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Booking = {
  __typename?: 'Booking';
  bookingTime?: Maybe<Scalars['String']>;
  client?: Maybe<Client>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  inHouse?: Maybe<Scalars['Boolean']>;
  provider?: Maybe<Provider>;
  service?: Maybe<Service>;
  status?: Maybe<BookingStatus>;
  updatedAt?: Maybe<Scalars['String']>;
};

export enum BookingStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Deleted = 'DELETED',
  Done = 'DONE',
  Pending = 'PENDING'
}

export enum CategoryType {
  Barber = 'BARBER',
  Hairdresser = 'HAIRDRESSER',
  MakeupArtist = 'MAKEUP_ARTIST',
  NailTechnician = 'NAIL_TECHNICIAN',
  Spa = 'SPA'
}

export type Client = {
  __typename?: 'Client';
  bookings?: Maybe<Array<Booking>>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  phone?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export enum DayType {
  Fri = 'FRI',
  Mon = 'MON',
  Sat = 'SAT',
  Sun = 'SUN',
  Thr = 'THR',
  Tue = 'TUE',
  Wed = 'WED'
}

export enum DurationUnitType {
  Hrs = 'HRS',
  Min = 'MIN'
}

export type Message = {
  __typename?: 'Message';
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addAccountAddress: Address;
  addOperatingTime: OperatingTime;
  addService: Service;
  addSocial: Social;
  addStaff: Staff;
  addTradingAddress: Address;
  addTradingInfo: Provider;
  addUser: User;
  contactMail: Message;
  deleteOperatingTime: OperatingTime;
  deleteService: Service;
  deleteSocial: Social;
  deleteStaff: Staff;
  requestPasswordReset: Message;
  resetPassword: Message;
  signIn: UserToken;
  updateAccount: User;
  updateAccountAddress: Address;
  updateOperatingTime: OperatingTime;
  updateService: Service;
  updateSocial: Social;
  updateStaff: Staff;
  updateTradingAddress: Address;
  updateTradingInfo: Provider;
};


export type MutationAddAccountAddressArgs = {
  areaCode: Scalars['String'];
  city: Scalars['String'];
  province: Scalars['String'];
  streetName: Scalars['String'];
  streetNumber: Scalars['String'];
  town: Scalars['String'];
};


export type MutationAddOperatingTimeArgs = {
  closes: Scalars['String'];
  day: DayType;
  opens: Scalars['String'];
};


export type MutationAddServiceArgs = {
  category: CategoryType;
  description: Scalars['String'];
  duration: Scalars['Float'];
  durationUnit: DurationUnitType;
  inHouse: Scalars['Boolean'];
  name: Scalars['String'];
  price: Scalars['Float'];
};


export type MutationAddSocialArgs = {
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationAddStaffArgs = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};


export type MutationAddTradingAddressArgs = {
  areaCode: Scalars['String'];
  city: Scalars['String'];
  province: Scalars['String'];
  streetName: Scalars['String'];
  streetNumber: Scalars['String'];
  town: Scalars['String'];
};


export type MutationAddTradingInfoArgs = {
  logo?: InputMaybe<Scalars['File']>;
  phone: Scalars['String'];
  tradingName: Scalars['String'];
};


export type MutationAddUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  userImage?: InputMaybe<Scalars['File']>;
};


export type MutationContactMailArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  message: Scalars['String'];
  subject: Scalars['String'];
};


export type MutationDeleteOperatingTimeArgs = {
  operatingTimeId: Scalars['Int'];
};


export type MutationDeleteServiceArgs = {
  serviceId: Scalars['Int'];
};


export type MutationDeleteSocialArgs = {
  socialId: Scalars['Int'];
};


export type MutationDeleteStaffArgs = {
  staffId: Scalars['Int'];
};


export type MutationRequestPasswordResetArgs = {
  email: Scalars['String'];
  role: UserRole;
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordResetOTP: Scalars['String'];
};


export type MutationSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
};


export type MutationUpdateAccountArgs = {
  email?: InputMaybe<Scalars['String']>;
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userImage?: InputMaybe<Scalars['File']>;
};


export type MutationUpdateAccountAddressArgs = {
  addressId: Scalars['Int'];
  areaCode?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateOperatingTimeArgs = {
  closes?: InputMaybe<Scalars['String']>;
  day?: InputMaybe<DayType>;
  opens?: InputMaybe<Scalars['String']>;
  operatingTimeId: Scalars['Int'];
};


export type MutationUpdateServiceArgs = {
  category?: InputMaybe<CategoryType>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Float']>;
  durationUnit?: InputMaybe<DurationUnitType>;
  inHouse?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  serviceId: Scalars['Int'];
};


export type MutationUpdateSocialArgs = {
  name?: InputMaybe<Scalars['String']>;
  socialId: Scalars['Int'];
  username?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStaffArgs = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  staffId: Scalars['Int'];
};


export type MutationUpdateTradingAddressArgs = {
  addressId: Scalars['Int'];
  areaCode?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  streetNumber?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateTradingInfoArgs = {
  logo?: InputMaybe<Scalars['File']>;
  phone?: InputMaybe<Scalars['String']>;
  providerId: Scalars['Int'];
  tradingName?: InputMaybe<Scalars['String']>;
};

export type OperatingTime = {
  __typename?: 'OperatingTime';
  closes?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  day?: Maybe<DayType>;
  id: Scalars['Int'];
  opens?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type OperatingTimesQueryResults = {
  __typename?: 'OperatingTimesQueryResults';
  count?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  days: Array<DayType>;
  operatingTimes: Array<OperatingTime>;
};

export enum PaginationType {
  Cursor = 'CURSOR',
  Normal = 'NORMAL'
}

export type Provider = {
  __typename?: 'Provider';
  addresses?: Maybe<Array<Address>>;
  bookings?: Maybe<Array<Booking>>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  logoUrl?: Maybe<Scalars['String']>;
  operatingTimes?: Maybe<Array<OperatingTime>>;
  phone?: Maybe<Scalars['String']>;
  services?: Maybe<Array<Service>>;
  socials?: Maybe<Array<Social>>;
  staffs?: Maybe<Array<Staff>>;
  tradingName?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  operatingTime: OperatingTime;
  operatingTimes?: Maybe<OperatingTimesQueryResults>;
  provider?: Maybe<Provider>;
  providers: Array<Provider>;
  service: Service;
  services?: Maybe<ServicesQueryResults>;
  socials: Array<Social>;
  user?: Maybe<User>;
};


export type QueryOperatingTimeArgs = {
  operatingTimeId: Scalars['Int'];
};


export type QueryOperatingTimesArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  paginationType?: InputMaybe<PaginationType>;
};


export type QueryProviderArgs = {
  providerId?: InputMaybe<Scalars['Int']>;
};


export type QueryProvidersArgs = {
  search?: InputMaybe<Scalars['String']>;
};


export type QueryServiceArgs = {
  serviceId: Scalars['Int'];
};


export type QueryServicesArgs = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  paginationType?: InputMaybe<PaginationType>;
  providerId?: InputMaybe<Scalars['Int']>;
};

export type Service = {
  __typename?: 'Service';
  category?: Maybe<CategoryType>;
  createdAt?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Float']>;
  durationUnit?: Maybe<DurationUnitType>;
  id: Scalars['Int'];
  inHouse?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Float']>;
  staffs?: Maybe<Array<Staff>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type ServicesQueryResults = {
  __typename?: 'ServicesQueryResults';
  count?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['Int']>;
  services: Array<Service>;
};

export type Social = {
  __typename?: 'Social';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type Staff = {
  __typename?: 'Staff';
  createdAt?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  services?: Maybe<Array<Service>>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  updateBooking?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  address?: Maybe<Address>;
  createdAt?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  lastName?: Maybe<Scalars['String']>;
  provider?: Maybe<Provider>;
  role?: Maybe<UserRole>;
  state?: Maybe<UserStatus>;
  updatedAt?: Maybe<Scalars['String']>;
  userImageUrl?: Maybe<Scalars['String']>;
};

export enum UserRole {
  Admin = 'ADMIN',
  Client = 'CLIENT',
  Provider = 'PROVIDER'
}

export enum UserStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Inactive = 'INACTIVE',
  Pending = 'PENDING',
  Suspended = 'SUSPENDED'
}

export type UserToken = {
  __typename?: 'UserToken';
  token: Scalars['String'];
  user: User;
};

export type ContactMailMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  subject: Scalars['String'];
  message: Scalars['String'];
}>;


export type ContactMailMutation = { __typename?: 'Mutation', contactMail: { __typename?: 'Message', message: string } };

export type AddOperatingTimeMutationVariables = Exact<{
  day: DayType;
  opens: Scalars['String'];
  closes: Scalars['String'];
}>;


export type AddOperatingTimeMutation = { __typename?: 'Mutation', addOperatingTime: { __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null } };

export type DeleteOperatingTimeMutationVariables = Exact<{
  operatingTimeId: Scalars['Int'];
}>;


export type DeleteOperatingTimeMutation = { __typename?: 'Mutation', deleteOperatingTime: { __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null } };

export type UpdateOperatingTimeMutationVariables = Exact<{
  operatingTimeId: Scalars['Int'];
  day?: InputMaybe<DayType>;
  opens?: InputMaybe<Scalars['String']>;
  closes?: InputMaybe<Scalars['String']>;
}>;


export type UpdateOperatingTimeMutation = { __typename?: 'Mutation', updateOperatingTime: { __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null } };

export type AddTradingAddressMutationVariables = Exact<{
  streetNumber: Scalars['String'];
  streetName: Scalars['String'];
  town: Scalars['String'];
  city: Scalars['String'];
  province: Scalars['String'];
  areaCode: Scalars['String'];
}>;


export type AddTradingAddressMutation = { __typename?: 'Mutation', addTradingAddress: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } };

export type AddTradingInfoMutationVariables = Exact<{
  tradingName: Scalars['String'];
  phone: Scalars['String'];
  logo?: InputMaybe<Scalars['File']>;
}>;


export type AddTradingInfoMutation = { __typename?: 'Mutation', addTradingInfo: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, logoUrl?: string | null } };

export type UpdateTradingAddressMutationVariables = Exact<{
  addressId: Scalars['Int'];
  streetNumber?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  areaCode?: InputMaybe<Scalars['String']>;
}>;


export type UpdateTradingAddressMutation = { __typename?: 'Mutation', updateTradingAddress: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } };

export type UpdateTradingInfoMutationVariables = Exact<{
  providerId: Scalars['Int'];
  tradingName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  logo?: InputMaybe<Scalars['File']>;
}>;


export type UpdateTradingInfoMutation = { __typename?: 'Mutation', updateTradingInfo: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, logoUrl?: string | null } };

export type AddServiceMutationVariables = Exact<{
  name: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  duration: Scalars['Float'];
  durationUnit: DurationUnitType;
  inHouse: Scalars['Boolean'];
  category: CategoryType;
}>;


export type AddServiceMutation = { __typename?: 'Mutation', addService: { __typename?: 'Service', id: number, name?: string | null, description?: string | null, price?: number | null, duration?: number | null, durationUnit?: DurationUnitType | null, inHouse?: boolean | null, category?: CategoryType | null } };

export type DeleteServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
}>;


export type DeleteServiceMutation = { __typename?: 'Mutation', deleteService: { __typename?: 'Service', id: number, name?: string | null, description?: string | null, price?: number | null, duration?: number | null, durationUnit?: DurationUnitType | null, inHouse?: boolean | null, category?: CategoryType | null } };

export type UpdateServiceMutationVariables = Exact<{
  serviceId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
  duration?: InputMaybe<Scalars['Float']>;
  durationUnit?: InputMaybe<DurationUnitType>;
  inHouse?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CategoryType>;
}>;


export type UpdateServiceMutation = { __typename?: 'Mutation', updateService: { __typename?: 'Service', id: number, name?: string | null, description?: string | null, price?: number | null, duration?: number | null, durationUnit?: DurationUnitType | null, inHouse?: boolean | null, category?: CategoryType | null } };

export type AddSocialMutationVariables = Exact<{
  name: Scalars['String'];
  username: Scalars['String'];
}>;


export type AddSocialMutation = { __typename?: 'Mutation', addSocial: { __typename?: 'Social', id: number, name?: string | null, username?: string | null } };

export type DeleteSocialMutationVariables = Exact<{
  socialId: Scalars['Int'];
}>;


export type DeleteSocialMutation = { __typename?: 'Mutation', deleteSocial: { __typename?: 'Social', id: number, name?: string | null, username?: string | null } };

export type UpdateSocialMutationVariables = Exact<{
  socialId: Scalars['Int'];
  name?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
}>;


export type UpdateSocialMutation = { __typename?: 'Mutation', updateSocial: { __typename?: 'Social', id: number, name?: string | null, username?: string | null } };

export type AddAccountAddressMutationVariables = Exact<{
  streetNumber: Scalars['String'];
  streetName: Scalars['String'];
  town: Scalars['String'];
  city: Scalars['String'];
  province: Scalars['String'];
  areaCode: Scalars['String'];
}>;


export type AddAccountAddressMutation = { __typename?: 'Mutation', addAccountAddress: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } };

export type AddUserMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
  userImage?: InputMaybe<Scalars['File']>;
}>;


export type AddUserMutation = { __typename?: 'Mutation', addUser: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: UserRole | null, state?: UserStatus | null, userImageUrl?: string | null } };

export type RequestPasswordResetMutationVariables = Exact<{
  email: Scalars['String'];
  role: UserRole;
}>;


export type RequestPasswordResetMutation = { __typename?: 'Mutation', requestPasswordReset: { __typename?: 'Message', message: string } };

export type ResetPasswordMutationVariables = Exact<{
  passwordResetOTP: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = { __typename?: 'Mutation', resetPassword: { __typename?: 'Message', message: string } };

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  role: UserRole;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'UserToken', token: string, user: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: UserRole | null, state?: UserStatus | null, address?: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } | null, provider?: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null } | null } } };

export type UpdateAccountMutationVariables = Exact<{
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  userImage?: InputMaybe<Scalars['File']>;
}>;


export type UpdateAccountMutation = { __typename?: 'Mutation', updateAccount: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: UserRole | null, state?: UserStatus | null, userImageUrl?: string | null } };

export type UpdateAccountAddressMutationVariables = Exact<{
  addressId: Scalars['Int'];
  streetNumber?: InputMaybe<Scalars['String']>;
  streetName?: InputMaybe<Scalars['String']>;
  town?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  province?: InputMaybe<Scalars['String']>;
  areaCode?: InputMaybe<Scalars['String']>;
}>;


export type UpdateAccountAddressMutation = { __typename?: 'Mutation', updateAccountAddress: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } };

export type OperatingTimeQueryVariables = Exact<{
  operatingTimeId: Scalars['Int'];
}>;


export type OperatingTimeQuery = { __typename?: 'Query', operatingTime: { __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null } };

export type OperatingTimesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  paginationType?: InputMaybe<PaginationType>;
}>;


export type OperatingTimesQuery = { __typename?: 'Query', operatingTimes?: { __typename?: 'OperatingTimesQueryResults', days: Array<DayType>, cursor?: number | null, count?: number | null, operatingTimes: Array<{ __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null }> } | null };

export type ProviderQueryVariables = Exact<{
  providerId?: InputMaybe<Scalars['Int']>;
}>;


export type ProviderQuery = { __typename?: 'Query', provider?: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null, operatingTimes?: Array<{ __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null }> | null } | null };

export type ProvidersQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']>;
}>;


export type ProvidersQuery = { __typename?: 'Query', providers: Array<{ __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, logoUrl?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null, operatingTimes?: Array<{ __typename?: 'OperatingTime', id: number, day?: DayType | null, opens?: string | null, closes?: string | null }> | null, socials?: Array<{ __typename?: 'Social', id: number, name?: string | null, username?: string | null }> | null }> };

export type ServiceQueryVariables = Exact<{
  serviceId: Scalars['Int'];
}>;


export type ServiceQuery = { __typename?: 'Query', service: { __typename?: 'Service', id: number, name?: string | null, description?: string | null, price?: number | null, duration?: number | null, durationUnit?: DurationUnitType | null, inHouse?: boolean | null, category?: CategoryType | null } };

export type ServicesQueryVariables = Exact<{
  providerId?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  cursor?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  paginationType?: InputMaybe<PaginationType>;
}>;


export type ServicesQuery = { __typename?: 'Query', services?: { __typename?: 'ServicesQueryResults', cursor?: number | null, count?: number | null, services: Array<{ __typename?: 'Service', id: number, name?: string | null, description?: string | null, price?: number | null, duration?: number | null, durationUnit?: DurationUnitType | null, inHouse?: boolean | null, category?: CategoryType | null }> } | null };

export type SocialsQueryVariables = Exact<{ [key: string]: never; }>;


export type SocialsQuery = { __typename?: 'Query', socials: Array<{ __typename?: 'Social', id: number, name?: string | null, username?: string | null }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, firstName?: string | null, lastName?: string | null, email?: string | null, role?: UserRole | null, state?: UserStatus | null, userImageUrl?: string | null, address?: { __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null } | null, provider?: { __typename?: 'Provider', id: number, tradingName?: string | null, phone?: string | null, addresses?: Array<{ __typename?: 'Address', id: number, streetNumber?: string | null, streetName?: string | null, town?: string | null, city?: string | null, province?: string | null, areaCode?: string | null }> | null } | null } | null };
