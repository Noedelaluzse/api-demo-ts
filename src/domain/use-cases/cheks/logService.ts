import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CreateLogUseCase {
  execute(level: LogSeverityLevel, message: string, origin: string):Promise<void>;
}


export class LogService implements CreateLogUseCase {
  
  constructor(
    private readonly  logRepository : LogRepository
  ) {}

  async execute(level: LogSeverityLevel, message: string, origin: string): Promise<void> {

    const log = new LogEntity({
      level: level,
      message: message,
      origin: origin
    });

    this.logRepository.saveLog(log);
    
  }

}