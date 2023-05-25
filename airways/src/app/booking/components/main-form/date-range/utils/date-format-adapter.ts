import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import dayjs from 'dayjs';

@Injectable()
export class AppDateAdapter extends NativeDateAdapter {
  override parse(date: Date, parseFormat: string): Date | null {
    return dayjs(date, parseFormat).toDate() || null;
  }

  override format(date: Date, displayFormat: string): string {
    return dayjs(date).format(displayFormat);
  }
}