import { useState } from "react";

export default function App() {
  // =========================
  // DEVICES DATABASE
  // =========================

  const deviceTemplates = [
    { name: "مكيف 12 موفر", power: 1000 },
    { name: "مكيف 18 موفر", power: 1500 },
    { name: "مكيف 24 موفر", power: 2200 },

    { name: "مكيف 12 عادي", power: 1800 },
    { name: "مكيف 18 عادي", power: 2500 },
    { name: "مكيف 24 عادي", power: 3200 },

    { name: "ثلاجة", power: 200 },
    { name: "فريزر", power: 350 },
    { name: "غسالة", power: 800 },
    { name: "نشاف", power: 2500 },
    { name: "جلاية", power: 1800 },
    { name: "تلفزيون", power: 120 },
    { name: "راوتر", power: 20 },
    { name: "كمبيوتر", power: 300 },
    { name: "لابتوب", power: 90 },
    { name: "ميكرويف", power: 1200 },
    { name: "فرن كهربائي", power: 2500 },
    { name: "شفاط", power: 150 },
    { name: "مروحة", power: 100 },
    { name: "إنارة LED", power: 15 },
    { name: "مضخة ماء", power: 1500 },
  ];

  // =========================
  // PANELS DATABASE
  // =========================

  const panels = [
    {
      brand: "Jinko",
      power: 615,
      voc: 48.88,
      vmp: 40.6,
    },

    {
      brand: "Jinko",
      power: 620,
      voc: 49.08,
      vmp: 40.74,
    },

    {
      brand: "Longi",
      power: 645,
      voc: 49.62,
      vmp: 40.88,
    },

    {
      brand: "Longi",
      power: 650,
      voc: 49.72,
      vmp: 40.95,
    },

    {
      brand: "JA",
      power: 710,
      voc: 48.6,
      vmp: 40.8,
    },

    {
      brand: "JA",
      power: 715,
      voc: 48.8,
      vmp: 41,
    },
  ];

  // =========================
  // INVERTERS DATABASE
  // =========================

  const inverters = [
    {
      company: "AGS",
      model: "1.5kW",
      power: 1500,
      voltage: 12,
      strings: 1,
      maxPanels: 9,
    },

    {
      company: "AGS",
      model: "4kW",
      power: 4000,
      voltage: 24,
      strings: 1,
      maxPanels: 9,
    },

    {
      company: "AGS",
      model: "6kW",
      power: 6000,
      voltage: 48,
      strings: 1,
      maxPanels: 9,
    },

    {
      company: "AGS",
      model: "8kW",
      power: 8000,
      voltage: 48,
      strings: 2,
      maxPanels: 18,
    },

    {
      company: "AGS",
      model: "11kW",
      power: 11000,
      voltage: 48,
      strings: 2,
      maxPanels: 18,
    },

    {
      company: "Felicity",
      model: "12kW",
      power: 12000,
      voltage: 48,
      strings: 2,
      maxPanels: 18,
    },
  ];

  // =========================
  // BATTERIES DATABASE
  // =========================

  const batteries = [
    {
      model: "12100",
      voltage: 12,
      kwh: 1.26,
    },

    {
      model: "12200",
      voltage: 12,
      kwh: 2.56,
    },

    {
      model: "24100",
      voltage: 24,
      kwh: 2.56,
    },

    {
      model: "24200",
      voltage: 24,
      kwh: 5,
    },

    {
      model: "24300",
      voltage: 24,
      kwh: 7.5,
    },

    {
      model: "48100",
      voltage: 48,
      kwh: 5,
    },

    {
      model: "48200",
      voltage: 48,
      kwh: 10,
    },

    {
      model: "48250",
      voltage: 48,
      kwh: 12.5,
    },

    {
      model: "48300",
      voltage: 48,
      kwh: 15,
    },

    {
      model: "48314",
      voltage: 48,
      kwh: 16,
    },

    {
      model: "48350",
      voltage: 48,
      kwh: 17.5,
    },
  ];

  // =========================
  // SETTINGS
  // =========================

  const [settings, setSettings] = useState({
    batterySafety: 1.2,
    inverterSafety: 1.3,
    panelSafety: 1.3,
    sunHours: 6,
  });

  // =========================
  // LOADS
  // =========================

  const [loads, setLoads] = useState([
    {
      device: "",
      customPower: 0,
      quantity: 0,
      dayHours: 0,
      nightHours: 0,
    },
  ]);

  const [selectedPanel, setSelectedPanel] = useState(615);

  // =========================
  // FUNCTIONS
  // =========================

  const addLoad = () => {
    setLoads([
      ...loads,
      {
        device: "",
        customPower: 0,
        quantity: 0,
        dayHours: 0,
        nightHours: 0,
      },
    ]);
  };

  const removeLoad = (index) => {
    const updated = [...loads];

    updated.splice(index, 1);

    setLoads(updated);
  };

  const updateLoad = (index, field, value) => {
    const updated = [...loads];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    if (field === "device") {
      const found = deviceTemplates.find((d) => d.name === value);

      if (found) {
        updated[index].customPower = found.power;
      }
    }

    setLoads(updated);
  };

  // =========================
  // CALCULATIONS
  // =========================

  const totalDayConsumption = loads.reduce((sum, load) => {
    return sum + load.customPower * load.quantity * load.dayHours;
  }, 0);

  const totalNightConsumption = loads.reduce((sum, load) => {
    return sum + load.customPower * load.quantity * load.nightHours;
  }, 0);

  const totalConsumption = totalDayConsumption + totalNightConsumption;

  const peakLoad = loads.reduce((sum, load) => {
    return sum + load.customPower * load.quantity;
  }, 0);

  // =========================
  // SYSTEM VOLTAGE
  // =========================

  let systemVoltage = 12;

  if (peakLoad > 1500 || totalNightConsumption > 3000) {
    systemVoltage = 24;
  }

  if (peakLoad > 4000 || totalNightConsumption > 10000) {
    systemVoltage = 48;
  }

  // =========================
  // PANELS COUNT
  // =========================

  const selectedPanelData = panels.find(
    (panel) => panel.power === selectedPanel
  );

  const requiredPanelPower =
    (totalConsumption * settings.panelSafety) / settings.sunHours;

  const panelCount = Math.ceil(requiredPanelPower / selectedPanel);

  // =========================
  // INVERTER LOGIC
  // =========================

  const requiredInverterPower = peakLoad * settings.inverterSafety;

  let suitableInverters = inverters.filter(
    (inv) => inv.voltage === systemVoltage && inv.power >= requiredInverterPower
  );

  // تحقق من عدد الألواح

  suitableInverters = suitableInverters.filter(
    (inv) => panelCount <= inv.maxPanels
  );

  // إذا لا يوجد محول مناسب

  let systemWarning = "";

  if (suitableInverters.length === 0) {
    systemWarning = "النظام يحتاج محول أكبر أو أكثر من محول";

    suitableInverters = inverters.filter((inv) => inv.maxPanels >= 18);
  }

  // اقتصادي

  const economicalInverter = suitableInverters[0];

  // مريح

  let comfortInverter = suitableInverters[0];

  const biggerComfort = suitableInverters.find(
    (inv) => inv.power > economicalInverter.power
  );

  if (biggerComfort) {
    comfortInverter = biggerComfort;
  }

  // =========================
  // BATTERY LOGIC
  // =========================

  function getBestBattery(requiredKwh, voltage) {
    const options = batteries
      .filter((b) => b.voltage === voltage)
      .sort((a, b) => b.kwh - a.kwh);

    let bestBattery = options[0];

    let bestCount = 999;

    let bestTotal = 999999;

    options.forEach((battery) => {
      const count = Math.ceil(requiredKwh / battery.kwh);

      const total = count * battery.kwh;

      // الأولوية:
      // أقل عدد بطاريات

      if (total >= requiredKwh) {
        if (count < bestCount || (count === bestCount && total < bestTotal)) {
          bestBattery = battery;

          bestCount = count;

          bestTotal = total;
        }
      }
    });

    return {
      battery: bestBattery,
      count: bestCount,
      total: bestTotal,
    };
  }

  // اقتصادي

  const economicalBatteryRequired =
    (totalNightConsumption / 1000) * settings.batterySafety;

  const economicalBatteryData = getBestBattery(
    economicalBatteryRequired,
    economicalInverter.voltage
  );

  // مريح

  const comfortBatteryRequired = (totalNightConsumption / 1000) * 1.4;

  const comfortBatteryData = getBestBattery(
    comfortBatteryRequired,
    comfortInverter.voltage
  );

  // =========================
  // STRINGS
  // =========================

  const stringCount = economicalInverter.strings;

  const panelsPerString = Math.ceil(panelCount / stringCount);

  // =========================
  // VOC
  // =========================

  const totalVoc = panelsPerString * selectedPanelData.voc;

  return (
    <div
      style={{
        background: "#f3f4f6",
        minHeight: "100vh",
        padding: "25px",
        direction: "rtl",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1700px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
        }}
      >
        {/* MAIN */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "40px",
              marginBottom: "30px",
            }}
          >
            حاسبة الطاقة الشمسية
          </h1>

          {/* SETTINGS */}

          <div
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "15px",
              marginBottom: "30px",
            }}
          >
            <h2>إعدادات النظام</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: "15px",
                marginTop: "20px",
              }}
            >
              {Object.keys(settings).map((key) => (
                <div key={key}>
                  <div>{key}</div>

                  <input
                    type="number"
                    step="0.1"
                    value={settings[key]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        [key]: Number(e.target.value),
                      })
                    }
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* TABLE HEADERS */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px",
              gap: "10px",
              marginBottom: "15px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <div>الجهاز</div>
            <div>الاستهلاك W</div>
            <div>العدد</div>
            <div>ساعات الليل</div>
            <div>ساعات النهار</div>
            <div>الاستهلاك Wh</div>
            <div>حذف</div>
          </div>

          {/* LOADS */}

          {loads.map((load, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr 1fr 80px",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <select
                value={load.device}
                onChange={(e) => updateLoad(index, "device", e.target.value)}
              >
                <option value="">اختر جهاز</option>

                {deviceTemplates.map((device) => (
                  <option key={device.name}>{device.name}</option>
                ))}
              </select>

              <input
                type="number"
                value={load.customPower}
                onChange={(e) =>
                  updateLoad(index, "customPower", Number(e.target.value))
                }
              />

              <input
                type="number"
                value={load.quantity}
                onChange={(e) =>
                  updateLoad(index, "quantity", Number(e.target.value))
                }
              />

              <input
                type="number"
                value={load.nightHours}
                onChange={(e) =>
                  updateLoad(index, "nightHours", Number(e.target.value))
                }
              />

              <input
                type="number"
                value={load.dayHours}
                onChange={(e) =>
                  updateLoad(index, "dayHours", Number(e.target.value))
                }
              />

              <div
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {(
                  load.customPower *
                  load.quantity *
                  (load.dayHours + load.nightHours)
                ).toFixed(0)}{" "}
                Wh
              </div>

              <button
                onClick={() => removeLoad(index)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                }}
              >
                حذف
              </button>
            </div>
          ))}

          <button
            onClick={addLoad}
            style={{
              background: "black",
              color: "white",
              padding: "15px 25px",
              border: "none",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            إضافة جهاز
          </button>

          {/* PANELS */}

          <div
            style={{
              marginTop: "40px",
            }}
          >
            <h2>اختيار اللوح</h2>

            <select
              value={selectedPanel}
              onChange={(e) => setSelectedPanel(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              {panels.map((panel) => (
                <option key={panel.power} value={panel.power}>
                  {panel.brand} - {panel.power}W
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RESULTS */}

        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "20px",
          }}
        >
          <h2>نتائج النظام</h2>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <strong>استهلاك النهار:</strong>
            <br />
            {(totalDayConsumption / 1000).toFixed(2)} kWh
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <strong>استهلاك الليل:</strong>
            <br />
            {(totalNightConsumption / 1000).toFixed(2)} kWh
          </div>

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <strong>الحمل اللحظي:</strong>
            <br />
            {peakLoad} W
          </div>

          {/* WARNING */}

          {systemWarning && (
            <div
              style={{
                background: "#ffe5e5",
                color: "red",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "25px",
              }}
            >
              {systemWarning}
            </div>
          )}

          {/* اقتصادي */}

          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              border: "2px solid #ddd",
              borderRadius: "15px",
            }}
          >
            <h3>الخيار الاقتصادي</h3>

            <div>
              <strong>فولت النظام:</strong>
              <br />
              {economicalInverter.voltage}V
            </div>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>المحول:</strong>
              <br />
              {economicalInverter.company} - {economicalInverter.model}
            </div>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>البطارية:</strong>
              <br />
              {economicalBatteryData.battery.model}
              <br />
              سعة البطارية:
              {economicalBatteryData.battery.kwh}
              kWh
              <br />
              عدد البطاريات:
              {economicalBatteryData.count}
              <br />
              السعة الإجمالية:
              {economicalBatteryData.total}
              kWh
            </div>
          </div>

          {/* مريح */}

          <div
            style={{
              marginTop: "25px",
              padding: "20px",
              border: "2px solid green",
              borderRadius: "15px",
              background: "#f0fff4",
            }}
          >
            <h3>الخيار المريح</h3>

            <div>
              <strong>فولت النظام:</strong>
              <br />
              {comfortInverter.voltage}V
            </div>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>المحول:</strong>
              <br />
              {comfortInverter.company} - {comfortInverter.model}
            </div>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>البطارية:</strong>
              <br />
              {comfortBatteryData.battery.model}
              <br />
              سعة البطارية:
              {comfortBatteryData.battery.kwh}
              kWh
              <br />
              عدد البطاريات:
              {comfortBatteryData.count}
              <br />
              السعة الإجمالية:
              {comfortBatteryData.total}
              kWh
            </div>
          </div>

          {/* PANELS */}

          <div
            style={{
              marginTop: "35px",
            }}
          >
            <strong>عدد الألواح:</strong>
            <br />
            {panelCount} لوح
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>عدد السترينغات:</strong>

              <br />

              {stringCount}
            </div>
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>الألواح بكل سترينغ:</strong>

              <br />

              {panelsPerString}
            </div>
            <div
              style={{
                marginTop: "15px",
              }}
            >
              <strong>Voc الكلي:</strong>
              <br />
              {totalVoc.toFixed(2)}V
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
