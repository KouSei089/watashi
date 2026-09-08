import React from 'react';
import { useLocation } from 'react-router-dom';
import ProfileReading from './ProfileReading';
import ProfileOverture from './ProfileOverture';
import ProfilePhoto from './ProfilePhoto';

export const PROFILE_VARIANTS = [
  { key: 'a', label: '読み物として', Component: ProfileReading },
  { key: 'b', label: '静かな開幕', Component: ProfileOverture },
  { key: 'c', label: '写真主役', Component: ProfilePhoto },
] as const;

export type ProfileVariantKey = (typeof PROFILE_VARIANTS)[number]['key'];

export const DEFAULT_VARIANT: ProfileVariantKey = 'a';

export const useProfileVariant = (): ProfileVariantKey => {
  const { search } = useLocation();
  const value = new URLSearchParams(search).get('v');
  return PROFILE_VARIANTS.some((v) => v.key === value)
    ? (value as ProfileVariantKey)
    : DEFAULT_VARIANT;
};

/**
 * 「わたし」の節。見せ方の案を見比べるため、?v=a|b|c で切り替わる。
 * 案が決まったら、選ばれたものだけを残してこの仕組みごと畳む。
 */
const Profile: React.FC = () => {
  const variant = useProfileVariant();
  const { Component } = PROFILE_VARIANTS.find((v) => v.key === variant) ?? PROFILE_VARIANTS[0];
  return <Component />;
};

export default Profile;
