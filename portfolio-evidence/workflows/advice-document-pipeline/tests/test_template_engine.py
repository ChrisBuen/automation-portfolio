import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "src"))

from template_engine import flatten, remove_section, render_placeholders, unresolved_placeholders


class TemplateEngineTests(unittest.TestCase):
    def test_flatten_and_render_preserve_unknown_markers(self):
        values = flatten({"person": {"name": "Avery"}, "amount": 12})
        output = render_placeholders("[person_name] [amount] [review_item]", values)
        self.assertEqual(output, "Avery 12 [review_item]")
        self.assertEqual(unresolved_placeholders(output), ["[review_item]"])

    def test_remove_section_stops_at_peer_heading(self):
        source = "# Report\n\n## Optional\nRemove me\n\n## Keep\nKeep me\n"
        result = remove_section(source, "## Optional")
        self.assertNotIn("Remove me", result)
        self.assertIn("## Keep", result)


if __name__ == "__main__":
    unittest.main()
