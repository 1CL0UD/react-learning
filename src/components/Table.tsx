import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  category: z.string().min(1, { message: 'Please Select a Category' }),
});

type TableData = z.infer<typeof schema>;

const Table = () => {
  const { register } = useForm<TableData>({ resolver: zodResolver(schema) });
  return (
    <>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register('category')} className="form-select" id="category">
          <option value="all-categories" selected>
            All Categories
          </option>
          <option value="groceries">Groceries</option>

          <option value="utilities">Utilities</option>

          <option value="entertainment">Entertainment</option>
        </select>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Category</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Table;
