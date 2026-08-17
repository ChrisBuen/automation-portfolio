import sys
import unittest
from pathlib import Path


sys.path.insert(0, str(Path(__file__).parents[1] / "src"))
import document_qa


class DocumentQATests(unittest.TestCase):
    def test_release_ready_text_has_no_blockers(self):
        text = "The client has a fictional balanced objective. Human review is required."
        self.assertEqual(document_qa.check_visible_text(text), [])

    def test_placeholders_are_counted_without_echoing_content(self):
        issues = document_qa.check_visible_text("Hello {{private_field}}. [CONFIRM: fee amount]")
        self.assertEqual(issues, ["unresolved_placeholders:2"])
        self.assertNotIn("private_field", " ".join(issues))

    def test_internal_reference_code_blocks_release(self):
        issues = document_qa.check_visible_text("Prepared for CASE-DEMO-4821")
        self.assertEqual(issues, ["internal_reference_codes:1"])


if __name__ == "__main__":
    unittest.main()
