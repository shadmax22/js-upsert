import { set } from "../src/set";
import { upsert } from "../src/upsert";

const _LOAD_SCHEMA = {
  id: "1",
  PackageTypeValues: ["Pallets", "Boxes/Crates", "Containers"],
  PackageType: "Boxes/Crates",
  Units: "0",
  PalletTypeValues: [
    "48 x 40",
    "120 x 80CM (EUR1)",
    "120 x 100CM (EUR2)",
    "Pallets(Non specified size)",
  ],
  PalletType: "Pallets(Non specified size)",
  Length: "0",
  Width: "0",
  Height: "0",
  LengthShowable: "0",
  WidthShowable: "0",
  HeightShowable: "0",
  DimensionsTypeValues: ["M", "CM", "IN"],
  DimensionsType: "M",
  DimensionsTypeWorkable: "M",
  WeightTypeValues: ["KG", "LB"],
  Weight: "0",
  WeightType: "KG",
  ContainerTypeValues: ["20'", "40'", "40'HC", "45'HC"],
  ContainerType: "20'",
  containerLoadType: "LCL",
  OverWeight: "false",
};

export const _INITIAL_VALUE = {
  Origin: {
    Country: "China",
    Address: null,
    Type: "Factory/Warehouse",
  },
  Destination: {
    Country: "United Kingdom",
    Address: null,
    Type: "Business Address",
  },
  Goods: {
    GoodsValue: "0",
    GoodsCurrency: "$",
    GoodsStatus: "pending",
    isContainedHazardousGoods: false,
  },
  Load: [_LOAD_SCHEMA],
  shippingMode: "2",
  shippingPreference: "",
  refresh: 0,
};

const UnitConverter = {
  CM: 0.01,
  M: 1,
  IN: 0.0254,
};

let This = {};

const setValue = (e, current, oldValues) => {
  let ValuesCombination = {
    length: {
      LengthShowable: e.target.value,
      Length: e.target.value * UnitConverter[oldValues?.DimensionsTypeWorkable],
    },
    width: {
      WidthShowable: e.target.value,
      Width: e.target.value * UnitConverter[oldValues?.DimensionsTypeWorkable],
    },
    height: {
      HeightShowable: e.target.value,
      Height: e.target.value * UnitConverter[oldValues?.DimensionsTypeWorkable],
    },
    units: {
      Units: e.target.value,
    },
    dimensionType: {
      DimensionsTypeWorkable: e.target.value,
    },
  };
  return {
    ...oldValues,
    ...ValuesCombination[current],
    CBM: setCBM(e, current, oldValues),
  };
};
const setCBM = (e, current, oldValues) => {
  return (
    (((current == "length" ? e.target.value : oldValues.Length ?? 0) *
      (current == "width" ? e.target.value : oldValues.Width ?? 0) *
      (current == "height" ? e.target.value : oldValues.Height ?? 0)) /
      (oldValues == "CM" ? 1000000 : 1)) *
    (current == "units" ? e.target.value : oldValues.Units ?? 0)
  );
};
const changeDimension = (e, oldValues) => {
  let Dimensions = {
    Length: oldValues?.LengthShowable * UnitConverter[e?.target?.value],
    Height: oldValues?.HeightShowable * UnitConverter[e?.target?.value],
    Width: oldValues?.WidthShowable * UnitConverter[e?.target?.value],
    Units: oldValues?.Units,
  };

  return {
    ...oldValues,
    ...Dimensions,
    DimensionsTypeWorkable: e?.target?.value,

    CBM: setCBM(e, null, Dimensions),
  };
};

let _VAR = new Proxy(_INITIAL_VALUE, {
  get(target, prop) {
    return target[prop];
  },
  set(target, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  },
});

This = upsert(_VAR, {
  Load: set((o) => setValue({ target: { value: 2 } }, "width", o), [0]),
});

console.log(This);
