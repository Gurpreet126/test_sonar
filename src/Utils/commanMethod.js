import moment from "moment";

export const getDobfromTimestamp = (timeStamp) => {
  let dateTime;
  if (timeStamp === undefined) dateTime = "Invalid Date";
  else dateTime = moment(timeStamp).format("DD MMMM YYYY");
  return dateTime;
};

export const heightInFeet = {
  121.92: {
    height: "4’0\"",
    cm: 121.92,
  },
  124.46: {
    height: "4’1\"",
    cm: 124.46,
  },
  127.0: {
    height: "4’2\"",
    cm: 127.0,
  },
  129.54: {
    height: "4’3\"",
    cm: 129.54,
  },
  132.08: {
    height: "4’4\"",
    cm: 132.08,
  },
  134.62: {
    height: "4’5\"",
    cm: 134.62,
  },
  137.16: {
    height: "4’6\"",
    cm: 137.16,
  },
  139.7: {
    height: "4’7\"",
    cm: 139.7,
  },
  142.24: {
    height: "4’8\"",
    cm: 142.24,
  },
  144.78: {
    height: "4’9\"",
    cm: 144.78,
  },
  147.32: {
    height: "4’10\"",
    cm: 147.32,
  },
  149.86: {
    height: "4’11\"",
    cm: 149.86,
  },
  152.4: {
    height: "5’0\"",
    cm: 152.4,
  },
  154.94: {
    height: "5’1\"",
    cm: 154.94,
  },
  157.48: {
    height: "5’2\"",
    cm: 157.48,
  },
  160.02: {
    height: "5’3\"",
    cm: 160.02,
  },
  162.56: {
    height: "5’4\"",
    cm: 162.56,
  },
  165.1: {
    height: "5’5\"",
    cm: 165.1,
  },
  167.64: {
    height: "5’6\"",
    cm: 167.64,
  },
  170.18: {
    height: "5’7\"",
    cm: 170.18,
  },
  172.72: {
    height: "5’8\"",
    cm: 172.72,
  },
  175.26: {
    height: "5’9\"",
    cm: 175.26,
  },
  177.8: {
    height: "5’10\"",
    cm: 177.8,
  },
  180.34: {
    height: "5’11\"",
    cm: 180.34,
  },
  182.88: {
    height: "6’0\"",
    cm: 182.88,
  },
  185.42: {
    height: "6’1\"",
    cm: 185.42,
  },
  187.96: {
    height: "6’2\"",
    cm: 187.96,
  },
  190.5: {
    height: "6’3\"",
    cm: 190.5,
  },
  193.04: {
    height: "6’4\"",
    cm: 193.04,
  },
  195.58: {
    height: "6’5\"",
    cm: 195.58,
  },
  198.12: {
    height: "6’6\"",
    cm: 198.12,
  },
  200.66: {
    height: "6’7\"",
    cm: 200.66,
  },
  203.2: {
    height: "6’8\"",
    cm: 203.2,
  },
  205.74: {
    height: "6’9\"",
    cm: 205.74,
  },
  208.28: {
    height: "6’10\"",
    cm: 208.28,
  },
  210.82: {
    height: "6’11\"",
    cm: 210.82,
  },
  213.36: {
    height: "7’0\"",
    cm: 213.36,
  },
  215.9: {
    height: "7’1\"",
    cm: 215.9,
  },
  218.44: {
    height: "7’2\"",
    cm: 218.44,
  },
  220.98: {
    height: "7’3\"",
    cm: 220.98,
  },
  223.52: {
    height: "7’4\"",
    cm: 223.52,
  },
  226.06: {
    height: "7’5\"",
    cm: 226.06,
  },
  228.6: {
    height: "7’6\"",
    cm: 228.6,
  },
  231.14: {
    height: "7’7\"",
    cm: 231.14,
  },
  233.68: {
    height: "7’8\"",
    cm: 233.68,
  },
  236.22: {
    height: "7’9\"",
    cm: 236.22,
  },
  238.76: {
    height: "7’10\"",
    cm: 238.76,
  },
  241.3: {
    height: "7’11\"",
    cm: 241.3,
  },
};


export const heightArray = [
  {
    height: "4’0\"",
    cm: 121.92,
  },
  {
    height: "4’1\"",
    cm: 124.46,
  },
  {
    height: "4’2\"",
    cm: 127.0,
  },
  {
    height: "4’3\" ",
    cm: 129.54,
  },
  {
    height: "4’4\"",
    cm: 132.08,
  },
  {
    height: "4’5\"",
    cm: 134.62,
  },
  {
    height: "4’6\"",
    cm: 137.16,
  },
  {
    height: "4’7\"",
    cm: 139.7,
  },
  {
    height: "4’8\"",
    cm: 142.24,
  },
  {
    height: "4’9\"",
    cm: 144.78,
  },
  {
    height: "4’10\"",
    cm: 147.32,
  },
  {
    height: "4’11\"",
    cm: 149.86,
  },
  {
    height: "5’0\"",
    cm: 152.4,
  },
  {
    height: "5’1\"",
    cm: 154.94,
  },
  {
    height: "5’2\"",
    cm: 157.48,
  },
  {
    height: "5’3\"",
    cm: 160.02,
  },
  {
    height: "5’4\"",
    cm: 162.56,
  },
  {
    height: "5’5\"",
    cm: 165.1,
  },
  {
    height: "5’6\"",
    cm: 167.64,
  },
  {
    height: "5’7\"",
    cm: 170.18,
  },
  {
    height: "5’8\"",
    cm: 172.72,
  },
  {
    height: "5’9\"",
    cm: 175.26,
  },
  {
    height: "5’10\"",
    cm: 177.8,
  },
  {
    height: "5’11\"",
    cm: 180.34,
  },
  {
    height: "6’0\"",
    cm: 182.88,
  },
  {
    height: "6’1\"",
    cm: 185.42,
  },
  {
    height: "6’2\"",
    cm: 187.96,
  },
  {
    height: "6’3\"",
    cm: 190.5,
  },
  {
    height: "6’4\"",
    cm: 193.04,
  },
  {
    height: "6’5\"",
    cm: 195.58,
  },
  {
    height: "6’6\"",
    cm: 198.12,
  },
  {
    height: "6’7\"",
    cm: 200.66,
  },
  {
    height: "6’8\"",
    cm: 203.2,
  },
  {
    height: "6’9\"",
    cm: 205.74,
  },
  {
    height: "6’10\"",
    cm: 208.28,
  },
  {
    height: "6’11\"",
    cm: 210.82,
  },
  {
    height: "7’0\"",
    cm: 213.36,
  },
  {
    height: "7’1\"",
    cm: 215.9,
  },
  {
    height: "7’2\"",
    cm: 218.44,
  },
  {
    height: "7’3\"",
    cm: 220.98,
  },
  {
    height: "7’4\"",
    cm: 223.52,
  },
  {
    height: "7’5\"",
    cm: 226.06,
  },
  {
    height: "7’6\"",
    cm: 228.6,
  },
  {
    height: "7’7\"",
    cm: 231.14,
  },
  {
    height: "7’8\"",
    cm: 233.68,
  },
  {
    height: "7’9\"",
    cm: 236.22,
  },
  {
    height: "7’10\"",
    cm: 238.76,
  },
  {
    height: "7’11\"",
    cm: 241.3,
  },
];

