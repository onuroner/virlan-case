import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Api is running!';
  }

  async ingest(data: any): Promise<string> {
    try {
      const response = await axios.post(`${process.env.QUICKWIT_INDEX_URL}/ingest?commit=force`, data);
      if (response.status === 200) {
        return 'Data ingested successfully.';
      }
    } catch (error) {
      console.error('Error during ingest operation:', error.message);
      throw new Error('Failed to ingest data.');
    }
  }

  async search(query: string): Promise<any> {
    try {
      const url = `${process.env.QUICKWIT_INDEX_URL}/search`;
      const response = await axios.get(
        url,
        { params: { query: query } } // 'q' param specifies the search query
      );
      return response.data;
    } catch (error) {
      console.error('Error during search operation:', error.message);
      throw new Error('Failed to search data.');
    }
  }
}
