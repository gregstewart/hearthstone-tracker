const CLASSES = {
  "Rexxar": "Hunter",
  "Alleria Windrunner": "Hunter",
  "Garrosh Hellscream": "Warrior",
  "Magni Bronzebeard": "Warrior",
  "Jaina Proudmoore": "Mage",
  "Khadgar": "Mage",
  "Medivh": "Mage",
  "Uther Lightbringer": "Paladin",
  "Lady Liadrin": "Paladin",
  "Thrall": "Shaman",
  "Anduin Wrynn": "Priest",
  "Valeera Sanguinar": "Rogue",
  "Gul'dan": "Warlock",
  "Malfurion Stormrage": "Druid",
  "Hogger": "Training",
  "Millhouse Manastorm": "Training",
  "Lorewalker Cho": "Training",
  "King Mukla": "Training",
  "Hemet Nesingwary": "Training",
  "Illidan Stormrage": "Training"
};

export default function (name) {
  return CLASSES[name];
}
