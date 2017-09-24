"""empty message

Revision ID: ccf6ac1f8856
Revises: 406b874c9e9f
Create Date: 2017-09-15 11:13:48.189933

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ccf6ac1f8856'
down_revision = '406b874c9e9f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('dataset_to_discovery')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('dataset_to_discovery',
    sa.Column('dataset_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.Column('discovery_id', mysql.INTEGER(display_width=11), autoincrement=False, nullable=True),
    sa.ForeignKeyConstraint(['dataset_id'], [u'dataset.id'], name=u'dataset_to_discovery_ibfk_1'),
    sa.ForeignKeyConstraint(['discovery_id'], [u'discovery.id'], name=u'dataset_to_discovery_ibfk_2'),
    mysql_default_charset=u'utf8',
    mysql_engine=u'InnoDB'
    )
    # ### end Alembic commands ###
