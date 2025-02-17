from os import listdir
from os.path import isfile, join, isdir

from .author import *
from .cache import *
from .db import *


def path_to_files(path):
    files = []
    for f in listdir(path):
        if isfile(join(path, f)) and f.endswith('.html'):
            files.append(f)
        elif isdir(f):
            files += path_to_files(f)
    return files


def filter_authors(values):
    """
    :param: values
    :return:
    """
    with create_connection(database_file) as conn:
        sql = f"""
            SELECT * FROM authors WHERE TRUE
            """
        sql += f""" AND (idx = ? OR n LIKE '%'||?||'%' OR a LIKE '%'||?||'%' OR t LIKE '%'||?||'%')""" * len(values)
        all_values = []
        for v in values:
            all_values += [v, v, v, v]
        sql += ' ORDER BY id'
        print(sql, all_values)
        rows = conn.cursor().execute(sql, all_values).fetchall()
        return [Author(row) for row in rows]


def filter_authors_select(values, fields=None):
    """
    :param values:
    :param fields:
    :return:
    """
    if fields is None:
        fields = ['idx']
    with create_connection(database_file) as conn:
        sql = f"""
            SELECT {', '.join(fields)} FROM authors WHERE TRUE
            """
        sql += f""" AND (idx = ? OR n LIKE '%'||?||'%' OR a LIKE '%'||?||'%' OR t LIKE '%'||?||'%')""" * len(values)
        all_values = []
        for v in values:
            all_values += [v, v, v, v]
        print(sql, all_values)
        rows = conn.cursor().execute(sql, all_values).fetchall()
        return rows


def author_by_ids(ids):
    """
    :param: values
    :return:
    """
    with create_connection(database_file) as conn:
        sql = f"""
            SELECT * FROM authors WHERE id in ({','.join(['?'] * len(ids))})
            """
        rows = conn.cursor().execute(sql, ids).fetchall()
        return [Author(row) for row in rows]
