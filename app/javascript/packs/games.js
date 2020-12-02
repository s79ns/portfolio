const playerData = {
  name: "エンジニアになりたいむしょく",
  hp: 100,
  skill: 20,
  mind: 10,
};

const enemiesData = [
  {
    name: "ねんれいとみけいけんのかべ",
    hp: 300,
    skill: 30,
    mind: 5,
  },
  {
    name: "youtubeのゆうわく",
    hp: 120,
    skill: 20,
    mind: 0,
  },
  {
    name: "じゅしんりょうのとりたて",
    hp: 80,
    skill: 10,
    mind: 10,
  },
];

// 初回戦闘時のみmaxHpを定義する挙動の修正
for (let i = 0; i < enemiesData.length; i++) {
  enemiesData[i]["maxHp"] = enemiesData[i]["hp"];
}
// enemiesDataの配列からランダムに要素を取得する
let enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];

// 各DataにmaxHpを作成して現在のhpを代入
playerData["maxHp"] = playerData["hp"];
enemyData["maxHp"] = enemyData["hp"];

function insertText(id, text) {
  document.getElementById(id).textContent = text;
}

// ダメージ関数
function damegeCalulation(skill, mind) {
  // ダメージ範囲
  const damageRange = 0.2;

  // ダメージ範囲2
  const maxDamage = skill * (1 + damageRange);
  const minDamage = skill * (1 - damageRange);

  // ダメージ計算式（Math.floor 小数点以下を切り捨てる）
  const attackDamage = Math.floor(Math.random() * (maxDamage - minDamage));

  // enemyのmindがplayerのskillを上回っていると、マイナス値が返って回復してしまうのを防ぐ為に変数化する
  const damage = skill - attackDamage;

  // ダメージが1未満であれば0を返し、それ以外ならばダメージを返す
  if (damage < 1) {
    return 0;
  } else {
    return damage;
  }
}

// 戦闘ログナンバー変数
let logIndex = 0;

// 討伐変数
let nowkilledNumber = 0;
let targetkillsNumber = 2;

// 戦闘ログ関数
function insertLog(texts) {
  const logsElement = document.getElementById("logs");
  const createLog = document.createElement("li");

  // logIndex変数に1ずつ足していく（logIndex = logIndex + 1;と同定義）
  logIndex++;

  createLog.innerHTML = logIndex + ": " + texts;

  // insertBefore 要素(logsElement)の最初の子要素として入れる(入れる要素, どこに,どの要素か)
  logsElement.insertBefore(createLog, logsElement.firstChild);
}

// 戦闘後のモーダル関数
function gamemodal(titlename, hiddenNextButton = false) {
  // 戦闘後、gamemask及び、gamemodalにactiveクラスを追加してモーダルを表示
  document.getElementById("gamemask").classList.add("active");
  document.getElementById("gamemodal").classList.add("active");

  // 名前を書き換える部分を引数に指定
  document.getElementById("modalTitle").textContent = titlename;

  // hiddenNextButtonという引数を、初期値falseの状態で作り、trueでhiddenクラスを付与する
  if (hiddenNextButton) {
    document.getElementById("modalNextButton").classList.add("hidden");
  }
}

insertText("enemyName", enemyData["name"]);
insertText("EnemyHp", enemyData["hp"]);
insertText("currentEnemyHp", enemyData["hp"]);

insertText("playerName", playerData["name"]);
insertText("PlayerHp", playerData["hp"]);
insertText("currentPlayerHp", playerData["hp"]);

// 討伐数の書き換え
insertText("nowkilledNumber", nowkilledNumber);
insertText("targetkillsNumber", targetkillsNumber);

document.getElementById("attack").addEventListener("click", function () {
  // 勝敗フラグ
  let victory = false;
  let defeat = false;

  // プレイヤーと敵の名前の色を変える変数
  const playerName = '<span style= "color: blue;">' + playerData["name"] + "</span>";
  const enemyName = '<span style= "color: red;">' + enemyData["name"] + "</span>";

  // ダメージ変数
  let playerDamage = damegeCalulation(playerData["skill"], enemyData["mind"]);

  //クリティカル変数
  const criticalHitRate = 0.2;

  // クリティカル条件式
  if (Math.random() < criticalHitRate) {
    playerDamage *= 2;
    insertLog(playerName + "の攻撃！SMAAAASH!!" + enemyName + "に" + playerDamage + "のダメージ！");
  } else {
    insertLog(playerName + "の攻撃！" + enemyName + "に" + playerDamage + "のダメージ！");
  }
  // ダメージ計算
  enemyData["hp"] -= playerDamage;

  // HP書き換え処理
  insertText("currentEnemyHp", enemyData["hp"]);

  // HPゲージ style.width（取得した要素の幅を指定する）
  document.getElementById("currentEnemyHpGaugeValue").style.width = (enemyData["hp"] / enemyData["maxHp"]) * 100 + "%";

  if (enemyData["hp"] <= 0) {
    victory = true;

    // HPがマイナス表示されないように0に書き換える
    enemyData["hp"] = 0;
    insertText("currentEnemyHp", enemyData["hp"]);

    // HPゲージを0にする
    document.getElementById("currentEnemyHpGaugeValue").style.width = "0%";

    // モーダル関数を呼び出し、名前を書き換えて表示する
    document.getElementById("modalCloseButton").classList.add("hidden");
    gamemodal(enemyData["name"] + "を倒したッ！！");
  }

  // 勝敗が決まっていなければ処理をする（! 処理を反転）
  if (!victory) {
    let enemyDamage = damegeCalulation(playerData["mind"], enemyData["skill"]);
    if (Math.random() < criticalHitRate) {
      enemyDamage *= 2;
      insertLog(enemyName + "の攻撃！SMAAAASH!!" + playerName + "に" + enemyDamage + "のダメージ！");
    } else {
      insertLog(enemyName + "の攻撃！" + playerName + "に" + enemyDamage + "のダメージ！");
    }

    playerData["hp"] -= enemyDamage;
    insertText("currentPlayerHp", playerData["hp"]);
    document.getElementById("currentPlayerHpGaugeValue").style.width = (playerData["hp"] / playerData["maxHp"]) * 100 + "%";

    if (playerData["hp"] <= 0) {
      defeat = true;

      playerData["hp"] = 0;
      insertText(["currentPlayerHp"], playerData["hp"]);

      document.getElementById("currentPlayerHpGaugeValue").style.width = "0%";

      // モーダル関数を呼び出し、hiddenNextButtonフラグをtrueにし、hiddenクラスを追加する
      gamemodal(playerData["name"] + "は傷つき倒れた・・・！", true);
      document.getElementById("modalCloseButton").classList.remove("hidden");
      document.getElementById("modalCloseButton").addEventListener("click", function () {
        document.getElementById("gamemodal").classList.remove("active");
        document.getElementById("gamemask").classList.remove("active");
      });
    }
  }

  // ゲーム完了フラグを満たせばクラスを付与してボタンを押せなくする
  if (victory || defeat) {
    this.classList.add("deactive");
  }

  // 勝ったら討伐数増加
  if (victory) {
    nowkilledNumber++;
    insertText("nowkilledNumber", nowkilledNumber);

    // 倒した数と目標を比較し、目標を達成できたらクリアリザルトを表示
    if (nowkilledNumber === targetkillsNumber) {
      gamemodal("YOU WIN!", true);
      document.getElementById("modalCloseButton").classList.remove("hidden");
      document.getElementById("modalCloseButton").addEventListener("click", function () {
        document.getElementById("gamemodal").classList.remove("active");
        document.getElementById("gamemask").classList.remove("active");
      });
    }
  }
});

// To be continued...ボタンを押した処理
document.getElementById("modalNextButton").addEventListener("click", function () {
  // 0になったHPの代入
  enemyData["hp"] = enemyData["maxHp"];

  // 敵データの書き換え処理
  enemyData = enemiesData[Math.floor(Math.random() * enemiesData.length)];
  insertText("enemyName", enemyData["name"]);
  insertText("currentEnemyHp", enemyData["hp"]);
  insertText("EnemyHp", enemyData["hp"]);

  // HPゲージを満タンにする
  document.getElementById("currentEnemyHpGaugeValue").style.width = "100%";

  // モーダルのactiveクラスを削除して、モーダルを消去する
  document.getElementById("gamemodal").classList.remove("active");
  document.getElementById("gamemask").classList.remove("active");

  // 攻撃ボタンのdeactiveクラスを削除して、再度ボタンを押せるようにする
  document.getElementById("attack").classList.remove("deactive");
});
