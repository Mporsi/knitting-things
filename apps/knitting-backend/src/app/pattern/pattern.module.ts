import { Module } from "@nestjs/common";
import { Pattern } from "./entities/pattern.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Pattern])],
  controllers: [],
  providers: [],
})
export class PatternModule {}
