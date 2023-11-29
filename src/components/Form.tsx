import { FieldValues, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';

const schema = z.object({
  desc: z.string().min(3, { message: 'Please input at least 5 characters' }),
  amount: z
    .number({ invalid_type_error: 'Please input a number' })
    .min(1, { message: 'Must be above 1' }),
  category: z.string().min(1, { message: 'Please Select a Category' }),
});

type FormData = z.infer<typeof schema>;

const Form = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    onSubmit(data);
  };
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }),
    [isSubmitSuccessful, reset];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="desc" className="form-label">
          Description
        </label>
        <input
          {...register('desc')}
          type="text"
          className="form-control"
          id="desc"
        />
        {errors.desc && <p className="text-danger">{errors.desc.message}</p>}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">
          Amount
        </label>
        <input
          {...register('amount', { valueAsNumber: true })}
          type="number"
          className="form-control"
          id="amount"
        />
        {errors.amount && (
          <p className="text-danger">{errors.amount.message}</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <select {...register('category')} className="form-select" id="category">
          <option value="" selected></option>
          <option value="groceries">Groceries</option>

          <option value="utilities">Utilities</option>

          <option value="entertainment">Entertainment</option>
        </select>

        {errors.category && (
          <p className="text-danger">{errors.category.message}</p>
        )}
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
