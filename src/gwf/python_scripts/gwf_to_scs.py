import argparse
import os
import sys
from xml.etree.ElementTree import ParseError
import base64

from gwf_parser import GWFParser
from scs_writer import SCsWriter


class Gwf2SCs:

    def __init__(self):
        self.errors = []

    def run(self, xmlText):
        elements = {}
        error = Gwf2SCs.parse_gwf(xmlText, elements)
        if error is None:
            errors, scs = self.convert_to_scs(elements)
            if len(errors) == 0:
                print(scs)
            else:
                for error in errors:
                    print(error,file=sys.stderr)
                return
        else:
            print(error,file=sys.stderr)
            return


    @staticmethod
    def parse_gwf(input_path, elements):
        try:
            gwf_parser = GWFParser(elements)
            return gwf_parser.parse(input_path)
        except (TypeError, ParseError) as e:
            return e

    @staticmethod
    def convert_to_scs(elements):
        writer = SCsWriter()
        return writer.write(elements)


if __name__ == "__main__":
    converter = Gwf2SCs()
#     while True:
    xmlText = sys.stdin.read()
    converter.run(xmlText)
