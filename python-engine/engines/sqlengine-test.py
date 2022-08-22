import unittest
from unittest.mock import patch
from unittest.mock import Mock
from sqlengine import SQLEngine


class MyTestCase(unittest.TestCase):

    @patch('sqlengine.psycopg2')
    def test_psycopg2_called(self, mock_psycopg2):
        mock_connection = Mock()
        mock_cursor = Mock()

        mock_psycopg2.connect.return_value = mock_connection
        mock_connection.cursor.return_value = mock_cursor

        sql = SQLEngine('test-table', 'test-database', database_user='test-user')

        mock_psycopg2.connect.assert_called_once()
        mock_psycopg2.connect.assert_called_with("dbname=test-database user=test-user")

        sql.close()

        mock_cursor.close.assert_called_once()
        mock_connection.close.assert_called_once()


if __name__ == '__main__':
    unittest.main()
