import _get from "lodash/get";
import _filter from "lodash/filter";
import { v4 as uuidv4 } from "uuid";

import { MONTHS_LONG } from "../config/constants";

export function makeUser({
  fname,
  lname,
  address,
  email,
  gender,
  dob,
  photo,
  timezone,
}) {
  const dobObj = new Date(dob);
  const res = {
    email,
    gender,
    timezone,
    avatar: photo,
    uuid: uuidv4(),
    place: address,
    name: `${fname} ${lname}`,
    dob: dobObj.toLocaleString(),
  };

  if (dob) {
    res.birthYear = dobObj.getFullYear();
    res.birthMonth = MONTHS_LONG[dobObj.getMonth() + 1];
  }

  return res;
}

export function normalizeUser(user) {
  const place = _filter(
    [
      _get(user, "location.street.name", ""),
      _get(user, "location.city", ""),
      _get(user, "location.state", ""),
      _get(user, "location.country", ""),
    ],
    Boolean
  ).join(" ");

  const name = _filter(
    [
      _get(user, "name.title"),
      _get(user, "name.first"),
      _get(user, "name.last"),
    ],
    Boolean
  ).join(" ");
  const res = {
    name,
    place,
    email: user.email,
    gender: user.gender,
    uuid: uuidv4(),
    dob: _get(user, "dob.date", ""),
    avatar: _get(user, "picture.large", ""),
    timezone: _get(user, "location.timezone.description", ""),
  };

  if (res.dob) {
    const dob = new Date(res.dob);
    res.birthYear = dob.getFullYear();
    res.birthMonth = MONTHS_LONG[dob.getMonth() + 1];
  }

  return res;
}

// https://www.tutorialspoint.com/fuzzy-search-algorithm-in-javascript
export function fuzzySearch(objArr, props, query) {
  const rs = objArr.filter((obj) => {
    return props.some((prop) => {
      const str = String(obj[prop]).toLowerCase();

      let i = 0,
        n = -1,
        l;

      query = String(query).toLowerCase();

      for (; (l = query[i++]); ) {
        n = str.indexOf(l, n + 1);
        if (!~n) return false;
      }
      return true;
    });
  });

  return rs;
}

export async function sleep(t) {
  return new Promise((r) => setTimeout(r, t));
}
