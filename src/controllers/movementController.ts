import Movement from "../models/movimentacao";

export async function getMovements() {
  return await Movement.find();
}

export async function createMovement(data: any) {
  const movement = new Movement(data);
  const savedMovement = await movement.save();

  return savedMovement;
}
