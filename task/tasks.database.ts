import pool from '../database'; // Adjust path accordingly

export const getTasks = async () => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id');
    return result.rows;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw new Error('Failed to fetch tasks');
  }
};

export const getTaskById = async (id: number) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw new Error('Failed to fetch task');
  }
};

export const createTask = async (title: string, description: string) => {
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *',
      [title, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

export const updateTask = async (id: number, title: string, description: string) => {
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *',
      [title, description, id]
    );
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw new Error('Failed to update task');
  }
};

export const deleteTask = async (id: number) => {
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw new Error('Failed to delete task');
  }
};

