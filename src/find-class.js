const CLASSES = {
  "Alleria Windrunner": "Hunter",
  "Anduin Wrynn": "Priest",
  "Garrosh Hellscream": "Warrior",
  "Gul'dan": "Warlock",
  "Hemet Nesingwary": "Training",
  "Hogger": "Training",
  "Illidan Stormrage": "Training",
  "Jaina Proudmoore": "Mage",
  "Khadgar": "Mage",
  "King Mukla": "Training",
  "Lady Liadrin": "Paladin",
  "Lorewalker Cho": "Training",
  "Magni Bronzebeard": "Warrior",
  "Malfurion Stormrage": "Druid",
  "Medivh": "Mage",
  "Millhouse Manastorm": "Training",
  "Morgl the Oracle": "Shaman",
  "Rexxar": "Hunter",
  "Thrall": "Shaman",
  "Tyrande Whisperwind": "Priest",
  "Uther Lightbringer": "Paladin",
  "Valeera Sanguinar": "Rogue"
};

export default function (name) {
  return CLASSES[name];
}
