import emoji from "emoji-dictionary";

export const parseDate = dateStr => {
  const d = new Date(dateStr);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("-");
};

export const emojiSupport = text =>
  text.value.replace(/:\w+:/gi, name => {
    const code = emoji.getUnicode(name);
    return code || "";
  });
