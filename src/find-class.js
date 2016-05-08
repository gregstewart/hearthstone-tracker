const CLASSES = {
  "Rexxar": "Hunter",
  "Alleria Windrunner": "Hunter",
  "Garrosh Hellscream": "Warrior",
  "Magni Bronzebeard": "Warrior",
  "Jaina Proudmoore": "Mage",
  "Medivh": "Mage",
  "Medivh": "Mage",
  "Uther Lightbringer": "Paladin",
  "Lady Liadrin": "Paladin",
  "Thrall": "Shaman",
  "Anduin Wrynn": "Priest",
  "Valeera Sanguinar": "Rogue",
  "Gul'dan": "Warlock",
  "Malfurion Stormrage": "Druid"
};

export default function (name) {
  return CLASSES[name];
}
