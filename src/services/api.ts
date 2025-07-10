// import axios from 'axios';

// const API_BASE_URL = 'http://localhost:3001/api';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export interface Dataset {
//   id: string;
//   name: string;
//   description: string;
//   xData: number[];
//   yData: number[];
//   chartType: 'line' | 'bar' | 'scatter';
//   createdAt: string;
//   updatedAt: string;
// }

// export interface CreateDatasetRequest {
//   name: string;
//   description?: string;
//   xData: number[];
//   yData: number[];
//   chartType?: 'line' | 'bar' | 'scatter';
// }

// export interface ApiResponse<T> {
//   success: boolean;
//   data?: T;
//   message: string;
//   error?: string;
// }

// export const datasetsApi = {
//   // Get all datasets
//   getAll: async (): Promise<Dataset[]> => {
//     const response = await api.get<ApiResponse<Dataset[]>>('/datasets');
//     return response.data.data || [];
//   },

//   // Get dataset by ID
//   getById: async (id: string): Promise<Dataset> => {
//     const response = await api.get<ApiResponse<Dataset>>(`/datasets/${id}`);
//     if (!response.data.data) {
//       throw new Error(response.data.message || 'Dataset not found');
//     }
//     return response.data.data;
//   },

//   // Create new dataset
//   create: async (dataset: CreateDatasetRequest): Promise<Dataset> => {
//     const response = await api.post<ApiResponse<Dataset>>('/datasets', dataset);
//     if (!response.data.data) {
//       throw new Error(response.data.message || 'Failed to create dataset');
//     }
//     return response.data.data;
//   },

//   // Update dataset
//   update: async (id: string, dataset: Partial<CreateDatasetRequest>): Promise<Dataset> => {
//     const response = await api.put<ApiResponse<Dataset>>(`/datasets/${id}`, dataset);
//     if (!response.data.data) {
//       throw new Error(response.data.message || 'Failed to update dataset');
//     }
//     return response.data.data;
//   },

//   // Delete dataset
//   delete: async (id: string): Promise<void> => {
//     await api.delete(`/datasets/${id}`);
//   },

//   // Health check
//   health: async (): Promise<boolean> => {
//     try {
//       await api.get('/health');
//       return true;
//     } catch {
//       return false;
//     }
//   }
// };

// export default api;

// api.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Dataset {
  id: string;
  name: string;
  description: string;
  xData: number[];
  yData: number[];
  chartType: 'line' | 'bar' | 'scatter';
  createdAt: string;
  updatedAt: string;
}

export interface CreateDatasetRequest {
  name: string;
  description?: string;
  xData: number[];
  yData: number[];
  chartType?: 'line' | 'bar' | 'scatter';
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
  error?: string;
}

export const datasetsApi = {
  // Get all datasets
  getAll: async (): Promise<Dataset[]> => {
    const response = await api.get<ApiResponse<Dataset[]>>('/datasets');
    return response.data.data || [];
  },

  // Get dataset by ID
  getById: async (id: string): Promise<Dataset> => {
    const response = await api.get<ApiResponse<Dataset>>(`/datasets/${id}`);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Dataset not found');
    }
    return response.data.data;
  },

  // Create new dataset
  create: async (dataset: CreateDatasetRequest): Promise<Dataset> => {
    const response = await api.post<ApiResponse<Dataset>>('/datasets', dataset);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to create dataset');
    }
    return response.data.data;
  },

  // ✅ Fixed Update with ID check
  update: async (id: string | undefined, dataset: Partial<CreateDatasetRequest>): Promise<Dataset> => {
    if (!id) {
      throw new Error('Dataset ID is required for update');
    }

    const response = await api.put<ApiResponse<Dataset>>(`/datasets/${id}`, dataset);
    if (!response.data.data) {
      throw new Error(response.data.message || 'Failed to update dataset');
    }
    return response.data.data;
  },

  // Delete dataset
  delete: async (id: string): Promise<void> => {
    await api.delete(`/datasets/${id}`);
  },

  // Health check
  health: async (): Promise<boolean> => {
    try {
      await api.get('/health');
      return true;
    } catch {
      return false;
    }
  }
};

export default api;
