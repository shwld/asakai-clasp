import { getEnv } from "./util";

const SHEET_ID_MEMBERS = getEnv("SHEET_ID_MEMBERS");
const SHEET_ID_TOPIC = getEnv("SHEET_ID_TOPICS");
const SHEET_DATA_RANGE = "A:A"; // A列にデータ入れてる
const TEAM_NUMBER = 2; // 現在２チームに分かれて朝回

type Members = Array<string>;
export type MembersOfEachTeam = {
  a: Members;
  b: Members;
};

const getMembersOfEachTeam = () => {
  const members = getDataFromSheet(SHEET_ID_MEMBERS, SHEET_DATA_RANGE);
  shuffle(members);
  const membersEachTeam = splitByTeam(members);

  return membersEachTeam;
};

const getTopicAtRandom = (): string => {
  const topics = getDataFromSheet(SHEET_ID_TOPIC, SHEET_DATA_RANGE);
  const topic = topics[Math.floor(Math.random() * topics.length)];

  return topic;
};

const getDataFromSheet = (sheetId: string, range: string): Array<string> => {
  const sheet = SpreadsheetApp.openById(sheetId);
  const data = sheet.getRange(range).getValues().filter(String).flat();
  return data;
};

const shuffle = (members: Members): void => {
  for (var i = members.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = members[i];
    members[i] = members[r];
    members[r] = tmp;
  }
};

const splitByTeam = (members: Members): MembersOfEachTeam => {
  const half = Math.ceil(members.length / TEAM_NUMBER);
  const a = members.splice(0, half);
  const b = members.splice(-half);
  const membersOfEachTeam = {
    a: a,
    b: b,
  };

  return membersOfEachTeam;
};

export { getTopicAtRandom, getMembersOfEachTeam };
