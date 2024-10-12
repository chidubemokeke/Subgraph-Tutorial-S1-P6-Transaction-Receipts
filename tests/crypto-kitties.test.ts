import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll,
} from "matchstick-as/assembly/index";
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Pregnant } from "../generated/schema";
import { Pregnant as PregnantEvent } from "../generated/CryptoKitties/CryptoKitties";
import { handlePregnant } from "../src/mappings/crypto-kitties";
import { createPregnantEvent } from "./crypto-kitties-utils";

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    );
    let matronId = BigInt.fromI32(234);
    let sireId = BigInt.fromI32(234);
    let cooldownEndBlock = BigInt.fromI32(234);
    let newPregnantEvent = createPregnantEvent(
      owner,
      matronId,
      sireId,
      cooldownEndBlock
    );
    handlePregnant(newPregnantEvent);
  });

  afterAll(() => {
    clearStore();
  });

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Pregnant created and stored", () => {
    assert.entityCount("Pregnant", 1);

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Pregnant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    );
    assert.fieldEquals(
      "Pregnant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "matronId",
      "234"
    );
    assert.fieldEquals(
      "Pregnant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sireId",
      "234"
    );
    assert.fieldEquals(
      "Pregnant",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "cooldownEndBlock",
      "234"
    );

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  });
});
