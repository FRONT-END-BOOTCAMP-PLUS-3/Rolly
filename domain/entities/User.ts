import { UUID } from "@/types/common";

export interface User {
  id: UUID;
  email: string;
  name: string;
}
